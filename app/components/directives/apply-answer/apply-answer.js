'use strict';

angular.module('words')
      .directive('applyAnswer', function() {
        return {
          restrict: 'A',
          scope: {
            model:'=applyAnswer'
          },
          link: function(scope, element) {
            scope.$watch('model', function (value) {
              if(value == 'NA') {
                element.removeClass('word_wrong_answer');
                element.removeClass('word_correct_answer');
                element.addClass('word_no_answer');
              } else if(value == 'CORRECT') {
                element.removeClass('word_wrong_answer');
                element.removeClass('word_no_answer');
                element.addClass('word_correct_answer');
              } else {
                element.removeClass('word_correct_answer');
                element.removeClass('word_no_answer');
                element.addClass('word_wrong_answer');
              }
            });
          }
        }
      });
