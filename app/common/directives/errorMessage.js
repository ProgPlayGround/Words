(function() {
  'use strict';

  angular.module('words').directive('errorMessage', ['$parse', function($parse) {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function(scope, element, attrs, ngModel) {
        var model = $parse(attrs.message);
        var remove = false;
        ngModel.$validators.error = function(modelValue) {
          var hasError = model(scope);
          if(remove) {
            remove = false;
            model.assign(scope, '');
          } else if(hasError) {
            remove = true;
          }
          return !hasError;
        };

        scope.$watch(model, function(newValue) {
          ngModel.$validate();
        });

      }
    };
  }]);
})();
