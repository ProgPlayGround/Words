(function() {
  'use strict';
  angular.module('words').directive('imagePreview', function() {
    return {
      restrict: 'A',
      scope: {
        initialImageUrl: '=',
        imagePreview: '='
      },
      link: function(scope, element, attrs) {
        if(scope.initialImageUrl) {
          element[0].src = scope.initialImageUrl;
        }

        scope.$watch('imagePreview', function(newValue, oldValue) {
          if(angular.isDefined(newValue) && newValue !== oldValue) {
            if(newValue === null) {
              element[0].src = '';
            } else if(typeof newValue === 'string') {
              element[0].src = newValue;
            } else {
              var reader = new FileReader();
              reader.addEventListener('load', function() {
                element[0].src = reader.result;
              }, false);
              reader.readAsDataURL(newValue);
            }
          }
        });
      }
    }
  });
}());
