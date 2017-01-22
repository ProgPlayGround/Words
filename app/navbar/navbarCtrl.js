(function() {
  'use strict';

  angular.module('words').controller('navbarCtrl', ['$cookies', 'authService', 'fbAuthService', function($cookies, authService, fbAuthService) {
    var vm = this;

    var logout = {
      'basic': authService.logout,
      'fb': fbAuthService.logout
    }

    vm.logout = function() {
      var authType = $cookies.get('auth-type');
      if(authType) {
        logout[authType]();
      }
    }
  }]);
})();
