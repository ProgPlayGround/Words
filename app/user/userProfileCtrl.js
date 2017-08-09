(function(){
  angular.module('words').controller('UserProfileCtrl', ['profileManager', function(profileManager) {
    var vm = this;
    vm.selected = 'profile';

    vm.defaultImg = '../images/profile.png';

    vm.isActive = function(tab) {
      console.log(tab, vm.selected === tab);
      return vm.selected === tab;
    }

    vm.select = function(tab) {
      vm.selected = tab;
      console.log(vm.selected);
    }

    vm.profile = profileManager.profile();
  }]);
}());
