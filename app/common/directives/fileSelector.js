(function() {
  'use strict';
  angular.module('words').constant('maxFileSize', 100000).directive('fileSelector', ['maxFileSize', function(maxFileSize) {
    return {
      restrict: 'A',
      scope: {
        fileSelector: '=',
        selectionError: '='
      },
      link: function(scope, element) {
        element.bind('change', function() {
          scope.$apply(function() {
            var file = element[0].files[0];
            if(file !== undefined) {
              if(file.size < maxFileSize) {
                scope.selectionError = false;
                scope.fileSelector = file;
              } else {
                scope.selectionError = true;
              }
            }
          });
        });
      }
    }
  }]);
}());
