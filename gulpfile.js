var gulp = require('gulp');
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var bower = require('gulp-bower');
var cssnano = require('gulp-cssnano');
var argv = require('yargs').argv;
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');
var browserSync = require('browser-sync');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var imagemin = require('gulp-imagemin');
var join = require('path').join;
var asyncJs = require('async');

var destDir = 'bin';

gulp.task('bower', function () {
  return bower('libs');
});

gulp.task('clean', function () {
  return gulp.src(destDir, {read: false})
        .pipe(clean({force: true}));
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

gulp.task('css:watch', ['css'], browserSync.reload);

gulp.task('html', function() {
  return gulp.src(['app/**/*.html', ])
        .pipe(gulpif(argv.prod, htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest(destDir));
});

gulp.task('html:watch', ['html'], browserSync.reload);

gulp.task('js', function() {
  return gulp.src(['app/**/*.js', '!app/**/*_test.js'])
      .pipe(concat('bundle.js'))//check if it works
      .pipe(gulpif(!argv.prod, sourcemaps.init()))
      .pipe(gulpif(argv.prod, uglify('bundle.js')))
      .pipe(gulpif(!argv.prod, sourcemaps.write()))
      .pipe(gulp.dest(destDir));
});

gulp.task('js:watch', ['js'], browserSync.reload);

gulp.task('img', function() {
  return gulp.src(['images/**/*.{png,jpg,svg}'])
        .pipe(imagemin())
        .pipe(gulp.dest(join(destDir, 'images')));
});

gulp.task('image:watch', ['img'], browserSync.reload);

gulp.task('build', ['css', 'js', 'html', 'img']);

gulp.task('libs', function() {
  return gulp.src('libs/**/*.min.js')
      .pipe(gulp.dest(join(destDir, 'libs')));
});

gulp.task('default', ['libs', 'build']);

gulp.task('watch', function() {
  browserSync({
    server: {
      baseDir: 'bin/'
    }
  });

  gulp.watch('app/**/*.html', ['html:watch']);
  gulp.watch('app/**/*.@(css|less|scss|sss)', ['css:watch']);
  gulp.watch('app/**/*.@(png|jpg|svg)', ['img:watch']);
  gulp.watch('app/**/*.js', ['js:watch']);
});
