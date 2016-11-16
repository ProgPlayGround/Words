'use strict';

angular.module('words')
      .directive('applyAnswer', function() {
        return {
          restrict: 'A',
          scope: {
            model:'=ngModel'
          },
          link: function(scope, element, attrs) {
            scope.$watch('model', function (value) {
              if(value == 'NA') {
                element.removeClass('word_card_wrong_answer');
                element.removeClass('word_card_correct_answer');
                element.addClass('word_card_no_answer');
              } else if(value == 'CORRECT') {
                element.removeClass('word_card_wrong_answer');
                element.removeClass('word_card_no_answer');
                element.addClass('word_card_correct_answer');
              } else {
                element.removeClass('word_card_correct_answer');
                element.removeClass('word_card_no_answer');
                element.addClass('word_card_wrong_answer');
              }
            });
          }
        }
      });
