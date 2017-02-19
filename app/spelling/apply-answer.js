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
            element.removeClass('border_wrong_answer');
            element.removeClass('border_correct_answer');
            element.addClass('word_no_answer');
          } else if(value === 'CORRECT') {
            element.removeClass('border_wrong_answer');
            element.removeClass('word_no_answer');
            element.addClass('border_correct_answer');
          } else {
            element.removeClass('border_correct_answer');
            element.removeClass('word_no_answer');
            element.addClass('border_wrong_answer');
          }
        });
      }
    }
  });
})();
