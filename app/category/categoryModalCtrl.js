(function() {
  'use strict';

  angular.module('words').controller('CategoryModalCtrl', ['categoryManager', '$uibModalInstance',
  function(categoryManager, $uibModalInstance) {
    var vm = this;

    vm.selectedImg = null;
    vm.selectionError = false;

    vm.addCategory = function() {
      categoryManager.add(vm.category, vm.selectedImg);
      $uibModalInstance.close();
    };

    vm.close = function() {
      $uibModalInstance.close();
    };

  }]);
}());
