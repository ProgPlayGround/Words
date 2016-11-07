var gulp = require('gulp');
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var bower = require('gulp-bower');
var cssnano = require('gulp-cssnano');
var argv = require('yargs').argv;
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');

var destDir = 'bin';

gulp.task('bower', function () {
  return bower('libs');
});

gulp.task('copy-static', function() {
  return gulp.src(['app/images/**/*.{png,jpg,svg}','app/**/*.html', 'app/**/*.js', '!app/**/*_test.js'])
      .pipe(gulp.dest(destDir));
});

gulp.task('css', function() {
  return gulp.src('app/**/*.{css,less,scss,sss}')
        .pipe(gulp.dest(destDir))
        .pipe(gulpif(!argv.prod, sourcemaps.init()))
        .pipe(autoprefixer())
        .pipe(less())
        .pipe(gulpif(argv.prod, cssnano()))
        .pipe(gulpif(!argv.prod, sourcemaps.write()))
        .pipe(gulp.dest(destDir));
});
