(function() {
  'use strict';

  angular.module('words').controller('CategoryCtrl', ['categoryManager', function(categoryManager) {
    var vm = this;
    vm.categories = [{'name': 'first'}, {'name': 'second'}];
  }]);
}());
