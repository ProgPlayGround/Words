//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: '.',

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-bootstrap/ui-bootstrap.min.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'bower_components/underscore/underscore-min.js',
      'spec/**/*.spec.js',
      'app/app.js',
      'app/common/**/*.js',
      'app/main/**/*.js',
      'app/sprint/**/*.js',
      'app/spelling/**/*.js',
      'app/quiz/**/*.js',
      'app/user/**/*.js',
      'app/navbar/**/*.js',
      'app/auth/**/*.js'
    ],

    reporters: ['progress', 'coverage'],

    preprocessors: {
      'app/**/*.js': ['coverage']
    },

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    },

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-coverage'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};
