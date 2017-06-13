(function() {
  'use strict';

  angular.module('words').controller('CategoryModalCtrl', ['categoryManager', '$uibModalInstance',
  function(categoryManager, $uibModalInstance) {
    var vm = this;

    vm.selectedImg = null;
    vm.selectionError = false;

    vm.error = {};

    vm.addCategory = function() {
      categoryManager.add(vm.category, vm.selectedImg, function(res) {
        if(res.success) {
          vm.close();
        } else {
          if(res.status === 409) {
            vm.error.duplicate = true;
          }
        }
      });
    };

    vm.close = function() {
      $uibModalInstance.close();
    };

  }]);
}());
