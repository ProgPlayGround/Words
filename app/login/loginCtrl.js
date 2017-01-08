(function() {
  'use strict';

  angular.module('words').controller('LoginCtrl', ['$state', 'authService', function($state, authService) {
    var vm = this;
    vm.email = '';
    vm.password = '';

    vm.login = function() {
      authService.login(vm.email, vm.password, function(response) {
        if(response.success) {
          $state.go('main');
        } else {
          vm.authFailed = true;
        }
      });
    };
  }]);
})();
