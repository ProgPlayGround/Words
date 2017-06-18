(function() {
  'use strict';

  angular.module('words').controller('CategoryModalCtrl', ['categoryManager', 'categoryMode', 'selectedCategory', '$uibModalInstance',
  function(categoryManager, categoryMode, selectedCategory, $uibModalInstance) {
    var vm = this;

    vm.selectedImg = null;
    vm.selectionError = false;

    vm.mode = categoryMode;
    vm.category = categoryMode === 'edit' ? selectedCategory : '';
    vm.error = {};

    function addCategory() {
      categoryManager.add(vm.category, vm.selectedImg, function(res) {
        if(res.success) {
          vm.close();
        } else {
          validate(res.status);
        }
      });
    }

    function editCategory() {
      categoryManager.edit(selectedCategory, vm.category, vm.selectedImg, function(res) {
        if(res.success) {
          vm.close();
        } else {
          validate(res.status);
        }
      });
    }

    function validate(status) {
      if(status === 409) {
        vm.error.duplicate = true;
      }
    }

    vm.submit = function() {
      if(vm.mode === 'edit') {
        editCategory();
      } else {
        addCategory();
      }
    };

    vm.close = function() {
      $uibModalInstance.close();
    };

  }]);
}());
