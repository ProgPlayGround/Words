(function(){
  angular.module('words').controller('UserProfileCtrl', ['ProfileManager', function(profileManager) {
    var vm = this;
    vm.selected = 'profile';

    vm.isActive = function(tab) {
      return vm.selected == tab;
    }

    vm.select = function(tab) {
      vm.selected = tab;
    }

    vm.profile = profileManager.profile();
  }]);
})();
