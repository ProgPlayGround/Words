'use strict';

angular.module('words')
    .directive('focus', function() {
      return {
        restrict: 'E',
        controller: function($scope) {
          $scope.elements = [];

          this.register = function(element) {
            $scope.elements.push(element);
          }

          this.next = function(index) {
            if(index >= 0 && index + 1 < $scope.elements.length) {
              $scope.elements[index].blur();
              $scope.elements[index + 1].focus();
              $scope.elements[index + 1].select();
            } else if(index + 1 == $scope.elements.length) {
              $scope.elements[index].select();
            }
          }

          this.previous = function(index) {
            if(index > 0 && index < $scope.elements.length) {
              $scope.elements[index].blur();
              $scope.elements[index - 1].focus();
              $scope.elements[index - 1].select();
            }
          }
        }
      };
    });
