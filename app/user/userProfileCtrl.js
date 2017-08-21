(function(){
  angular.module('words').controller('UserProfileCtrl', ['$state', 'profileManager', function($state, profileManager) {
    var vm = this;
    vm.defaultImg = '../images/profile.png';

    vm.profile = profileManager.profile();
    vm.profile.$promise.then(function(data) {
      editForm();
    });

    vm.submit = function() {
      profileManager.edit(vm.edit.profile).$promise.then(function(result) {
        vm.profile.name = result.name;
        vm.profile.surname = result.surname;
        vm.profile.age = result.age;
        vm.profile.avatar = result.avatar + '?' + Date.now();
      });
      $state.go('user.view');
    };

    vm.cancel = function() {
      editForm();
      $state.go('user.view');
    };

    function editForm() {
      vm.edit = {
        maxDate: new Date(),
        profile: {
          avatar: vm.profile.avatar,
          name: vm.profile.name,
          surname: vm.profile.surname,
          birthday: new Date(vm.profile.birthday)
        },
        error:{}
      };
    }

  }]);
}());
