(function() {
  'use strict';

  angular.module('words').controller('NavbarCtrl', ['$cookies', 'authService', 'fbAuthService', 'vkAuthService', function($cookies, authService, fbAuthService, vkAuthService) {
    var vm = this;

    vm.logout = function() {
      switch ($cookies.get('auth-type')) {
        case 'basic':
          authService.logout();
          break;
        case 'fb':
          fbAuthService.logout();
          break;
        case 'vk':
          vkAuthService.logout();
          break;
      }
    };
  }]);
}());
