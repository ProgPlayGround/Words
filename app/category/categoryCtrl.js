(function() {
  'use strict';

  angular.module('words').controller('CategoryCtrl', ['categoryManager', 'categoryModalManager', function(categoryManager, categoryModalManager) {
    var vm = this;

    categoryManager.init(function(categories) {
      vm.categories = categories;
    });

    vm.addCategory = function() {
      categoryModalManager.add();
    };

    vm.removeCategory = function(category) {
      categoryManager.delete(category);
    };
  }]);
}());
