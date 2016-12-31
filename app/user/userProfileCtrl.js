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

    vm.avatar = 'images/no-avatar.png';
    vm.username = 'Eirc Pristonson';
    vm.age = 25;
    vm.status = 'intermediate';
    vm.level = 1;
    vm.progress = 25;
    vm.activities = [
      {"date": "15 December 2016", "info": ["Registered", "Edit profile information"]},
      {"date": "17 December 2016", "info": ["Learn new word"]}
    ];
  });
})();
