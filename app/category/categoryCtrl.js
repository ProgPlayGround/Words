(function() {
  'use strict';

  angular.module('words').controller('CategoryCtrl', ['categoryManager', function(categoryManager) {
    var vm = this;
    vm.categories = categoryManager.get();

    vm.addCategory = function() {
      categoryManager.add(category);
    };

    vm.removeCategory = function(category) {
      categoryManager.delete(category);
    };
  }]);
}());
