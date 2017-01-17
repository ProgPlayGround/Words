(function() {
  'use strict';

  angular.module('words').directive('checkPassword', function() {
    function isASCII(str) {
      return /^[\x21-\x7F]*$/.test(str);
    }

    return {
      require: '^ngModel',
      restrict: 'A',
      scope: {
        password: '=ngModel',
        model: '=checkPassword'
      },
      link: function(scope) {
        scope.$watch('password', function(value) {
          if(!isASCII(value)) {
            scope.model.invalidPassword = true;
          } else {
            delete scope.model.invalidPassword;
          }
        });
      }
    }
  });
})();
