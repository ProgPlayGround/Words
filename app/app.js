'use strict';

angular.module('words', ['ui.router', 'ngAnimate'])
    .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('sprint', {
          url: '/sprint',
          templateUrl: 'controllers/sprint/sprint.html',
          controller: 'SprintCtrl',
          controllerAs: 'spt'
        });

        $urlRouterProvider.otherwise('/sprint');
}]);
