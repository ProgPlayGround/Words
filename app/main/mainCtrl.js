(function() {
  'use strict';
  angular.module('words').controller('MainCtrl', ['mainService', 'categoryManager', 'userService',
  function(mainService, categoryManager, userService) {
    var vm = this;

    vm.categories = [];
    vm.currentCategory = mainService.selectedCategory();
    vm.switch = {
      on: 'Learn',
      off: 'Review'
    };
    vm.mode = userService.mode() || vm.switch.on;
    vm.initialState = vm.mode === vm.switch.on ? true : false;

    vm.modeChanged = function(state) {
      vm.mode = state ? vm.switch.on : vm.switch.off;
      userService.changeMode(vm.mode);
    };

    categoryManager.init(function(categories) {
      categories.$promise.then(function(data) {
        vm.categories = data;
        var selected = Array.prototype.find.call(vm.categories, function(elem, idx) {
          return elem.name === vm.currentCategory.name;
        });
        vm.currentCategory = selected ? selected : vm.categories[0];
      });
    });

    vm.selectCategory = function() {
      mainService.newCategory(vm.currentCategory);
    };

  }]);
}());
