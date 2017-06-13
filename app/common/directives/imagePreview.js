(function() {
  'use strict';
  angular.module('words').directive('imagePreview', function() {
    return {
      restrict: 'A',
      scope: {
        imagePreview: '='
      },
      link: function(scope, element) {
        scope.$watch('imagePreview', function(newValue, oldValue) {
          if(angular.isDefined(newValue) && newValue !== oldValue) {
            if(newValue === null) {
              element[0].src = '';
            } else {
              var reader = new FileReader();
              reader.addEventListener("load", function() {
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
