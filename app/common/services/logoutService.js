(function() {
  'use strict';

  angular.module('words').factory('logoutService', ['mainService', function(mainService) {
    return {
      logout: function() {
        mainService.clear();
      }
    };
  }]);
}());
