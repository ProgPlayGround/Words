(function(){
  angular.module('words').controller('UserProfileCtrl', function($scope) {
    var vm = this;
    vm.selected = 'profile';

    vm.isActive = function(tab) {
      return vm.selected == tab;
    }

    vm.select = function(tab) {
      vm.selected = tab;
    }
  });
})();
