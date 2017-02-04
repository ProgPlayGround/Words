(function() {
  'use strict';

  angular.module('words').controller('RegistrationCtrl', ['$state', 'authService', 'fbAuthService', 'vkAuthService', '$log',
   function($state, authService, fbAuthService, vkAuthService, $log) {
    var vm = this;
    vm.email = '';
    vm.password = '';
    vm.error = '';
    vm.errorClick = false;

    vm.registration = function() {
      if(vm.email && vm.password) {
        vm.errorClick = false;
        authService.registration(vm.email, vm.password, function(response) {
          if(response.success) {
            $state.go('main');
          } else if(response.data.errorCode == 1){
            vm.error = response.data.message;
          }
        });
      } else {
        vm.errorClick = true;
      }
    };

    vm.fbLogin = function() {
      fbAuthService.login(function() {
        $state.go('main');
      });
    };

    vm.vkLogin = function() {
      vkAuthService.login(function() {
        $state.go('main');
      });
    };

    vm.init = function() {
      vkAuthService.init(function() {
        $log.log('vk callback');
      });
    };
  }]);
})();
