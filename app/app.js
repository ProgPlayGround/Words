'use strict';

angular.module('words', ['ui.router', 'ngAnimate'])
    .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('sprint', {
          abstract: true,
          url: '/sprint',
          templateUrl: 'controllers/sprint/sprint.html',
          controller: 'SprintCtrl',
          controllerAs: 'spt'
        }).state('sprint.quest', {
          url: '/quest',
          templateUrl: 'controllers/sprint/sprint.quest.html'
        }).state('sprint.description', {
          url: '/description',
          templateUrl: 'controllers/sprint/sprint.description.html'
        });

        $urlRouterProvider.otherwise('/sprint/quest');
}]);
