(function() {
  'use strict';

  angular.module('words').controller('LoginCtrl', ['$state', 'authService', 'fbAuthService', function($state, authService, fbAuthService) {
    var vm = this;
    vm.email = '';
    vm.password = '';
    vm.error = {};

    vm.login = function() {
      if(vm.email && vm.password) {
        vm.errorClick = false;
        authService.login(vm.email, vm.password, function(response) {

          console.log(response);
          if(response.success) {
            $state.go('main');
          } else if(response.data.errorCode == 2) {
            vm.error.login = response.data.message;
          } else if(response.data.errorCode == 3) {
            vm.error.password = response.data.message;
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
  }]);
})();
