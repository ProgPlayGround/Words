'use strict';

var wordsApp = angular.module('words', ['ngRoute'])
      .config(['$locationProvider', '$routeProvider',
      function($locationProvider, $routeProvider) {

          $locationProvider.hashPrefix('!');

          $routeProvider.when('/sprint', {
            templateUrl: 'controllers/sprint/sprint.html',
            controller: 'SprintCtrl',
            controllerAs: 'spt'
          });

          $routeProvider.otherwise({
            redirectTo: '/sprint'
          });
}]);
