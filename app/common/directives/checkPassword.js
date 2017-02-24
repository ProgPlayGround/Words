(function() {
  'use strict';

  angular.module('words').directive('checkPassword', function() {
    function isASCII(str) {
      return /^[\x21-\x7F]*$/.test(str);
    }

    return {
      require: '^ngModel',
      restrict: 'A',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$validators.invalidPassword = function(modelValue) {
          return isASCII(modelValue);
        }
      }
    }
  });
}());
