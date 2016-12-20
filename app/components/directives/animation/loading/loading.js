'use strict';

angular.module('words')
  .directive('loading', ['$animate', '$interval', function($animate, $interval) {
    return {
      restrict: 'E',
      scope: {
        model:'='
      },
      controller: function($scope) {
        $scope.elements = [];
        var index = 0;

        this.register = function(element) {
          $scope.elements.push(element);
        }

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
      link: function(scope) {

        if(scope.animation == undefined) {
          scope.animation = $interval(function() {
            scope.animate();
          }, 500);
        }

        scope.$watch('model', function(value) {
          if(value == false && scope.animation) {
            $interval.cancel(scope.animation);
            scope.animation = undefined;
          }
        });
      }
    };
  }]);
