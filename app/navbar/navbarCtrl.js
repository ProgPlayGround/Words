(function() {
  'use strict';

  angular.module('words').controller('NavbarCtrl', ['$cookies', '$scope', 'authService', 'fbAuthService', 'vkAuthService', 'logoutService',
  function($cookies, $scope, authService, fbAuthService, vkAuthService, logoutService) {
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

    $scope.$on('$stateChangeStart', function(event, toState) {
      if(toState.name === 'auth.login') {
        logoutService.logout();
      }
    });
  }]);
}());
