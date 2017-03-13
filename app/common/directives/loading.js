(function() {
'use strict';
angular.module('words').directive('loading', ['$animate', '$interval', 'requestCounter',
 function($animate, $interval, requestCounter) {
  return {
    restrict: 'E',
    controller: function($scope) {
      $scope.elements = [];
      var index = 0;

      this.register = function(element) {
        $scope.elements.push(element);
      };

      $scope.animate = function() {
        if(index < $scope.elements.length) {
          $animate.addClass($scope.elements[index++], 'swing');
        } else {
          _.each($scope.elements, function(element) {
            $animate.removeClass(element, 'swing');
          });
          index = 0;
        }
      }
    },
    link: function(scope, element) {
      if(angular.isUndefined(scope.animation)) {
        scope.animation = $interval(function() {
          scope.animate();
        }, 500);
      }

      scope.$watch(requestCounter.requestCount, function(newValue) {
        if(newValue === 0 ) {
          if(scope.animation) {
            $interval.cancel(scope.animation);
            scope.animation = undefined;
          }
          $animate.addClass(element, 'fadeOut animated');
        } else if(element.hasClass('fadeOut')) {
          $animate.removeClass(element, 'fadeOut animated');
        }
      });
    }
    };
  }]);
}());
