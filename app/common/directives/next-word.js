(function(){
  'use strict';
  angular.module('words').directive('nextWordNav', ['$animate', function($animate) {
    return {
      restrict: 'A',
      scope: {
        index: '=nextWordNav',
        callback: '&navCallback',
        animation: '@navAnimation'
      },
      link: function(scope, element) {
        scope.$watch('index', function(newValue, oldValue) {
          if(newValue && newValue != oldValue) {
            $animate.addClass(element, scope.animation + 'Out').then(function() {
              scope.callback();
              $animate.removeClass(element, scope.animation + 'Out');
              $animate.addClass(element, scope.animation + 'In').then(function() {
                $animate.removeClass(element, scope.animation + 'In');
              });
            });
          }
        });
      }
    };
  }]);
}());
