(function() {
  'use strict';

  angular.module('words').controller('CategoryCtrl', ['categoryManager', function(categoryManager) {
    var vm = this;
    vm.categories = categoryManager.get();

    vm.removeCategory = function(category) {
      console.log(category);
    };

    vm.addCategory = function() {
      console.log("Add caregory");
    }
  }]);
}());
