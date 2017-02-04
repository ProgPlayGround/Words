(function() {
  'use strict';
  angular.module('words', ['ui.router', 'ui.bootstrap', 'ngResource', 'ngCookies', 'ngAnimate', 'ngMessages'])
  .config(['$stateProvider', '$urlRouterProvider', '$qProvider', '$httpProvider',
  function($stateProvider, $urlRouterProvider, $qProvider, $httpProvider) {
    $qProvider.errorOnUnhandledRejections(false);
    $stateProvider.state('main', {
      url: '/main',
      templateUrl: 'main/main.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    }).state('user', {
      abstract:true,
      url: '/user',
      templateUrl: 'user/user.html',
      controller: 'UserProfileCtrl',
      controllerAs: 'user'
    }).state('user.profile', {
      url: '/profile',
      templateUrl: 'user/profile.html'
    }).state('quiz', {
      abstract: true,
      url: '/quiz',
      templateUrl: 'quiz/word-quiz.html',
      controller: 'WordQuizCtrl',
      controllerAs: 'quiz'
    }).state('quiz.question', {
      url: '/quest',
      templateUrl: 'quiz/word-quiz.question.html'
    }).state('quiz.description', {
      url: '/description',
      templateUrl: 'quiz/word-quiz.description.html'
    }).state('auth', {
      abstract: true,
      url: '/auth',
      templateUrl: 'auth/auth.html',
    }).state('auth.login', {
      url: '/login',
      templateUrl: 'auth/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'auth'
    }).state('auth.registration', {
      url: '/registration',
      templateUrl:'auth/registration.html',
      controller: 'RegistrationCtrl',
      controllerAs: 'auth'
    });

    $urlRouterProvider.otherwise('/auth/login');

    $httpProvider.interceptors.push('forbiddenInterceptor', 'requestCounter');
  }])
  .run(['fbAuthService', 'vkAuthService', '$log', function(fbAuthService, vkAuthService, $log) {
    fbAuthService.init(function() {
      $log.log('fb callback');
    });
    // vkAuthService.init(function() {
    //   $log.log('vk callback');
    // });
  }]);
})();
