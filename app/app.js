(function() {
  'use strict';
  angular.module('words', ['ui.router', 'ui.bootstrap', 'ngResource', 'ngCookies', 'ngAnimate'])
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
    }).state('login', {
      url: '/login',
      templateUrl: 'login/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'lgn'
    });

    $urlRouterProvider.otherwise('/login');

    $httpProvider.interceptors.push('forbiddenInterceptor', 'requestCounter');
  }]);
})();
