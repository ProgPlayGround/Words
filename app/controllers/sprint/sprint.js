'use strict';

angular.module('words').controller('SprintCtrl', ['$scope', 'wordsLoaderService',
function($scope, wordsLoader) {
  $scope.data = wordsLoader.getWords();
  var answer = [];
  for(var i = 0; i < $scope.data.translation.ua[0]; ++i) {
    answer[i] = {char: ''};
  }
  $scope.answer=answer;
}]);
