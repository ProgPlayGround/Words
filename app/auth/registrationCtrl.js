(function() {
  'use strict';

  angular.module('words').controller('RegistrationCtrl', ['authService', function(authService) {
    var vm = this;
    vm.email = '';
    vm.password = '';

    vm.registration = function() {
      authService.registration(vm.email, vm.password, function(response) {
        if(response.success) {
          $state.go('main');
        } else {

        }
      });
    };
  }]);
})();
