(function() {
  'use strict';

  angular.module('words').controller('CategoryCtrl', ['categoryManager', 'categoryModalManager', function(categoryManager, categoryModalManager) {
    var vm = this;

    categoryManager.init(function(categories) {
      console.log(categories);
      vm.categories = categories;
    });

    vm.addCategory = function() {
      categoryModalManager.addCategory();
    };

    vm.removeCategory = function(category) {
      categoryManager.delete(category);
    };
  }]);
}());
