(function() {
  'use strict';
  angular.module('words').controller('MainCtrl', ['mainService', 'selectCategoryModalManager', function(mainService, selectCategoryModalManager) {
    var vm = this;

    vm.currentCategory = mainService.selectCategory;

    vm.selectCategory = function() {
      selectCategoryModalManager.open();
    };

  }]);
}());
