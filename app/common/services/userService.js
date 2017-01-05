(function() {
  'use strict';

  angular.module('words').factory('userService', function() {
    var user;
    return {
      set: function(id, token) {
        user = {
          'id': id,
          'token': token
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
})();
