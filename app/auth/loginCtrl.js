(function() {
  'use strict';

  angular.module('words').controller('LoginCtrl', ['$state', 'authService',  function($state, authService) {
    var vm = this;
    vm.email = '';
    vm.password = '';
    vm.error = '';
    
    vm.login = function() {
      if(vm.email == '' || vm.password == '') {
        vm.errorClick = true;
      } else {
        authService.login(vm.email, vm.password, function(response) {
          if(response.success) {
            $state.go('main');
          } else {
            console.log(response.message);
            vm.error = response.message;
          }
        });
      }
    };
  }]);
})();
