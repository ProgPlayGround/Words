(function(module) {
  'use strict';
  module.directive('item', function() {
    return {
      require: '^loading',
      restrict: 'A',
      link: function(scope, element, attrs, controller) {
        controller.register(element[0]);
      }
    }
  });
})(angular.module('words'));
