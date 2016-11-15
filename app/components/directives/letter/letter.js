'use strict';

angular.module('words')
      .directive('letter', function() {
        return {
          require:'^focus',
          restrict: 'A',
          scope: {
            char: '=',
            index: '=',
            model: '=ngModel'
          },
          link: function(scope, element, attrs, focusCtrl) {
            focusCtrl.register(element[0]);
            scope.$watch("model", function (value) {
              if(value !== undefined) {
                if(value == '') {
                  element.removeClass('wrong_answer');
                  element.removeClass('right_answer');
                  focusCtrl.previous(scope.index);
                } else {
                  if(scope.char == value) {
                    element.removeClass('wrong_answer');
                    element.addClass('right_answer');
                  } else {
                    element.removeClass('right_answer');
                    element.addClass('wrong_answer');
                  }
                  focusCtrl.next(scope.index);
                }
              }
            });
          }
        };
      });
