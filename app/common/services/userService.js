(function() {
  'use strict';

  angular.module('words').factory('userService', ['$rootScope', function($rootScope) {

    return {
      set: function(id) {
        sessionStorage.userId = id;
      },
      clear: function() {
        sessionStorage.userId = null;
      },
      get: function() {
        return sessionStorage.userId;
      }
    };
  }]);
}());
