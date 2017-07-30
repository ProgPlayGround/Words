(function() {
  'use strict';
  angular.module('words').controller('MainCtrl', ['mainService', 'categoryManager', function(mainService, categoryManager) {
    var vm = this;

    vm.categories = [];
    vm.currentCategory = mainService.selectedCategory();

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
