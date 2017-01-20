(function() {
  'use strict';

  angular.module('words').controller('RegistrationCtrl', ['$state', 'authService', function($state, authService) {
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
  }]);
})();
