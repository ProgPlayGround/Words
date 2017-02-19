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
    }).state('spelling', {
      abstract: true,
      url: '/spelling',
      templateUrl: 'spelling/word-quiz.html',
      controller: 'WordQuizCtrl',
      controllerAs: 'quiz'
    }).state('spelling.question', {
      url: '/quest',
      templateUrl: 'spelling/word-quiz.question.html'
    }).state('spelling.description', {
      url: '/description',
      templateUrl: 'spelling/word-quiz.description.html'
    }).state('auth', {
      abstract: true,
      url: '/auth',
      templateUrl: 'auth/auth.html'
    }).state('auth.login', {
      url: '/login',
      templateUrl: 'auth/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'auth'
    }).state('auth.registration', {
      url: '/registration',
      templateUrl: 'auth/registration.html',
      controller: 'RegistrationCtrl',
      controllerAs: 'auth'
    }).state('quiz', {
      url: '/quiz',
      templateUrl: 'quiz/quiz.html',
      controller: 'QuizCtrl',
      controllerAs: 'quiz'
    });

    $urlRouterProvider.otherwise('/auth/login');

    $httpProvider.interceptors.push('forbiddenInterceptor', 'requestCounter');
  }])
  .run(['fbAuthService', 'vkAuthService', '$timeout', '$log', function(fbAuthService, vkAuthService, $timeout, $log) {

    vkAuthInit();

    fbAuthInit();

    function vkAuthInit() {
      vkAuthService.init(function() {
        $log.log('vk subscription callback');
      });

      //TODO: Move to $document usage
      $timeout(function() {
        /*eslint-disable */
        var el = document.createElement("script");
        el.type = "text/javascript";
        el.src = "https://vk.com/js/api/openapi.js?139";
        el.async = true;
        document.getElementById("vk_api_transport").appendChild(el);
        /*eslint-enable */
      }, 0);
    }

    function fbAuthInit() {
      fbAuthService.init(function() {
        $log.log('fb subscription callback');
      });

      //TODO: Move to $document usage
      /*eslint-disable */
      (function(d, s, id) {
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
      } (document, 'script', 'facebook-jssdk'));
      /*eslint-enable */
    }
  }]);
}());
