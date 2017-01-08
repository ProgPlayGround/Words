(function() {
  'use strict';

  angular.module('words').controller('navbarCtrl', ['authService', function(authService) {
    var vm = this;

    this.logout = function() {
      authService.logout();
    }
  }]);
})();
