(function() {
  'use strict';

  angular.module('words').controller('SelectCategoryModalCtrl', ['mainService', 'categoryManager', '$uibModalInstance', 'selectedCategory',
  function(mainService, categoryManager, $uibModalInstance, selectedCategory) {
    var vm = this;

    vm.categories = [];

    categoryManager.init(function(categories) {
      categories.$promise.then(function(data) {
        vm.categories = data;
        Array.prototype.unshift.call(vm.categories, {name: 'All'});
        var selected = Array.prototype.find.call(vm.categories, function(elem) {
          return elem.name === selectedCategory.name;
        });
        vm.selectedCategory = selected ? selected : vm.categories[0];
      });
    });

    vm.select = function() {
      mainService.newCategory(vm.selectedCategory);
      vm.close();
    };

    vm.close = function() {
      $uibModalInstance.close();
    };

  }]);
}());
