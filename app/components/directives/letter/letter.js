'use strict';

angular.module('words')
      .directive('letter', function() {
        return {
          restrict: 'A',
          scope: {
            char: '=',
            model: '=ngModel'
          },
          link: function(scope, element, attrs) {
            scope.$watch("model", function (value) {
              if(!value) {
                element.removeClass('wrong_answer');
                element.removeClass('right_answer');
              } else {
                if(scope.char == value) {
                  element.removeClass('wrong_answer');
                  element.addClass('right_answer');
                } else {
                  element.removeClass('right_answer');
                  element.addClass('wrong_answer')
                }
              }
            });
          }
        };
      });
