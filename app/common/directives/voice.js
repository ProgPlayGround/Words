(function() {
  'use strict';

  angular.module('words').directive('voice', function() {

    return {
      restrict: 'E',
      template: '<audio>' +
        '<source src="{{source}}"></source>' +
        '</audio>',
      scope: {
        source: '=',
        play: '='
      },
      replace: true,
      link: function(scope, element, attrs) {
          scope.$watch('play', function(value) {
            if(value) {
              element[0].play();
              scope.play = false;
            }
          });
      }
    }
  });
}());
