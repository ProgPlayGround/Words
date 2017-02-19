(function() {
  'use strict';
  angular.module('words').directive('applyAnswer', function() {
    return {
      restrict: 'A',
      scope: {
        model:'=applyAnswer'
      },
      link: function(scope, element) {
        scope.$watch('model', function (value) {
          if(value === 'NA') {
            element.removeClass('border-wrong-answer');
            element.removeClass('border-correct-answer');
            element.addClass('word-no-answer');
          } else if(value === 'CORRECT') {
            element.removeClass('border-wrong-answer');
            element.removeClass('word-no-answer');
            element.addClass('border-correct-answer');
          } else {
            element.removeClass('border-correct-answer');
            element.removeClass('word-no-answer');
            element.addClass('border-wrong-answer');
          }
        });
      }
    }
  });
})();
