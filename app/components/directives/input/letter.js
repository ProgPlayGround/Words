'use strict';

angular.module('words')
      .directive('letter', function() {
        return {
          require:['^focus','ngModel'],
          restrict: 'A',
          scope: {
            char: '@',
            model: '=ngModel',
            onModelChange: '&onModelChange'
          },
          link: function(scope, element, attrs, controllers) {
            var focusCtrl = controllers[0];
            focusCtrl.register(element[0]);

            scope.index = parseInt(attrs.index);
            scope.preventCodes = {
              '32': true,
              '37': true,
              '38': true,
              '39': true,
              '40': true
            };

            scope.$watch('model', function (value) {
              if(angular.isDefined(value)) {
                if(value.length === 0) {
                  element.removeClass('letter_wrong_answer');
                  element.removeClass('letter_correct_answer');
                  focusCtrl.previous(scope.index);
                } else {
                  if(scope.char == value) {
                    element.removeClass('letter_wrong_answer');
                    element.addClass('letter_correct_answer');
                  } else {
                    element.removeClass('letter_correct_answer');
                    element.addClass('letter_wrong_answer');
                  }
                  focusCtrl.next(scope.index);
                }
                scope.onModelChange();
              } else {
                element.removeClass('letter_wrong_answer');
                element.removeClass('letter_correct_answer');
              }
            });

            element.bind('keypress', function(event) {
              if (scope.model == String.fromCharCode(event.keyCode)){
                event.preventDefault();
                focusCtrl.next(scope.index);
              }
            });

            element.bind('keydown', function(event) {
              if(scope.preventCodes[event.keyCode]) {
                event.preventDefault();
              }

              switch(event.keyCode) {
                 case 8:
                 case 46:
                  if(!scope.model) {
                    event.preventDefault();
                    focusCtrl.previous(scope.index);
                  }
                 break;
                 case 37:
                  focusCtrl.previous(scope.index);
                 break;
                 case 39:
                  focusCtrl.next(scope.index);
                 break;
              }
            });

            element.bind('mousedown', function(event) {
              element[0].select();
              event.preventDefault();
            });
          }
        };
      });
