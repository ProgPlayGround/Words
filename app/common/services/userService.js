(function() {
  'use strict';

  angular.module('words').factory('userService', function() {

    return {
      set: function(id) {
        sessionStorage.userId = id;
      },
      clear: function() {
        sessionStorage.userId = null;
      },
      get: function() {
        return sessionStorage.userId;
      },
      changeMode: function(mode) {
        sessionStorage.mode = mode;
      },
      mode: function() {
        return sessionStorage.mode;
      },
      allowDuplicates: function() {
        return sessionStorage.mode !== 'Learn';
      }
    };
  });
}());
