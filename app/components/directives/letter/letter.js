'use strict';

angular.module('words')
      .directive('letter', function() {
        return {
          require:['^focus', 'ngModel'],
          restrict: 'A',
          scope: {
            char: '=',
            index: '=',
            model: '=ngModel',
            onModelChange: '&onModelChange'
          },
          link: function(scope, element, attrs, controllers) {
            var focusCtrl = controllers[0];
            focusCtrl.register(element[0]);
            scope.$watch('model', function (value) {
              if(value !== undefined) {
                if(value.length === 0) {
                  element.removeClass('wrong_answer');
                  element.removeClass('correct_answer');
                  focusCtrl.previous(scope.index);
                } else {
                  if(scope.char == value) {
                    element.removeClass('wrong_answer');
                    element.addClass('correct_answer');
                  } else {
                    element.removeClass('correct_answer');
                    element.addClass('wrong_answer');
                  }
                  focusCtrl.next(scope.index);
                }
                scope.onModelChange();
              }
            });

            element.bind('keypress', function(event) {
              if (scope.model == String.fromCharCode(event.keyCode)){
                event.preventDefault();
                focusCtrl.next(scope.index);
              }
            });

            element.bind('keydown', function(event) {
              if(event.keyCode == 32 || event.keyCode == 37 || event.keyCode == 39) {
                event.preventDefault();
              }

              if(!scope.model) {
                switch(event.keyCode) {
                   case 8:
                   case 46:
                     event.preventDefault();
                     focusCtrl.previous(scope.index);
                   break;
                }
              }
            });
          }
        };
      });
