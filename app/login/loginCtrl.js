(function() {
  'use strict';

  angular.module('words').controller('LoginCtrl', ['authService', function(authService) {
    var vm = this;

    vm.login = function(username, password) {
      authService.login(username, password, function(response) {
        if(response.success) {
          $location.path('/main');
        } else {
          vm.authFailed = true;
        }
      });
    };
  }]);
})();
