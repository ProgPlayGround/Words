(function() {
  'use strict';

  angular.module('words').controller('SelectCategoryModalCtrl', ['mainService', 'categoryManager', '$uibModalInstance',
  function(mainService, categoryManager, $uibModalInstance) {
    var vm = this;

    vm.categories = [];
    vm.categories.unshift({'name': 'All'}, {'name': 'Other'});

    vm.selectCategory = vm.categories[0];
    // categoryManager.init(function(categories) {
    //   vm.categories = [categories];
    //   vm.categories.unshift({'name': 'All'});
    // });

    vm.close = function() {
      $uibModalInstance.close();
    };

  }]);
}());
