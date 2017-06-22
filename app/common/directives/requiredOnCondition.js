(function() {
  'use strict';

  angular.module('words').directive('requiredOnCondition', function() {
    return {
      require: '^ngModel',
      restrict: 'A',
      scope: {
        condition: '=requiredOnCondition'
      },
      link: function(scope, element, attrs, ngModel) {
        ngModel.$validators.required = function(modelValue) {
          if(!scope.condition) {
            return true;
          } else {
            return modelValue !== '';
          }
        };

        scope.$watch('condition', function(value) {
          if(value) {
            ngModel.$validate();
          }
        });
      }
    }
  });
}());
