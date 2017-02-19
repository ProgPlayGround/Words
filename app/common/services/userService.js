(function() {
  'use strict';

  angular.module('words').factory('userService', function() {
    var user;
    return {
      set: function(username) {
        user = {
          'username': username
        };
      },
      clear: function() {
        user = {};
      },
      get: function() {
        return user;
      }
    }
  });
}());
