(function() {
  'use strict';
  angular.module('words').directive('focus', function() {
      return {
        restrict: 'E',
        controller: function($scope) {
          $scope.elements = [];

          this.register = function(element) {
            $scope.elements.push(element);
          }

          this.next = function(index) {
            if(index >= 0 && index + 1 < $scope.elements.length) {
              navigate(index, index + 1);
            } else if(index + 1 === $scope.elements.length) {
              $scope.elements[index].select();
            }
          }

          this.previous = function(index) {
            if(index > 0 && index < $scope.elements.length) {
              navigate(index, index - 1);
            }
          }

          function navigate(fromIndex, toIndex) {
              $scope.elements[fromIndex].blur();
              $scope.elements[toIndex].focus();
              $scope.elements[toIndex].select();
          }
        }
      };
    });
  })();
