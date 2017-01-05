(function() {
  'use strict';

  angular.module('words').controller('LoginCtrl', ['authService', function(authService) {
    var vm = this;
    vm.email = '';
    vm.password = '';

    vm.login = function() {
      authService.login(vm.email, vm.password, function(response) {
        if(response.success) {
          $location.path('/main');
        } else {
          vm.authFailed = true;
        }
      });
    };
  }]);
})();
