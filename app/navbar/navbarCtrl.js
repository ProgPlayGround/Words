(function() {
  'use strict';

  angular.module('words').controller('navbarCtrl', ['$cookies', 'authService', 'fbAuthService', 'vkAuthService', function($cookies, authService, fbAuthService, vkAuthService) {
    var vm = this;

    var logout = {
      'basic': authService.logout,
      'fb': fbAuthService.logout,
      'vk': vkAuthService.logout
    };

    vm.logout = function() {
      var authType = $cookies.get('auth-type');
      if(authType) {
        logout[authType]();
      }
    };
  }]);
})();
