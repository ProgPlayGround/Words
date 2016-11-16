'use strict';

angular.module('words').controller('SprintCtrl', ['$scope', 'wordsLoaderService',
function($scope, wordsLoader) {
  $scope.data = wordsLoader.getWords();
  $scope.answer = initializeAnswer();

  function initializeAnswer() {
    var answer = [];
    var answerLength = $scope.data.translation.ua[0].length;
    for(var i = 0; i < answerLength; ++i) {
      answer[i] = {char: ''};
    }
    return answer;
  }
}]);
