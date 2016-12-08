'use strict';

angular.module('words', ['ui.router', 'ngAnimate'])
    .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('quiz', {
          abstract: true,
          url: '/quiz',
          templateUrl: 'controllers/word-quiz/word-quiz.html',
          controller: 'WordQuizCtrl',
          controllerAs: 'quiz'
        }).state('quiz.question', {
          url: '/quest',
          templateUrl: 'controllers/word-quiz/word-quiz.question.html'
        }).state('quiz.description', {
          url: '/description',
          templateUrl: 'controllers/word-quiz/word-quiz.description.html'
        });

        $urlRouterProvider.otherwise('/quiz/quest');
}]);
