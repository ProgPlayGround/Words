(function() {
  'use strict';

  angular.module('words').factory('httpAuthHeaders', ['$cookies', function($cookies) {
    return {
      header: function() {
        return {
          'auth-type': $cookies.get('auth-type'),
          'auth-token': $cookies.get('token')
        }
      }
    };
  }]);
}());
