'use strict';

angular.module('words').controller('SprintCtrl', ['$scope', 'wordsLoaderService',
function($scope, wordsLoader) {
  $scope.data = wordsLoader.getWords();
  var translation = $scope.data.translation.ua[0];
  $scope.answer = initializeAnswer();
  $scope.answerState = 'NA';

  $scope.isCorrect = function() {
    return $scope.answerState=='CORRECT';
  }

  $scope.checkAnswer = function() {
    for(var i = 0; i < $scope.answer.length; ++i) {
      if(!$scope.answer[i].char) {
        $scope.answerState = 'NA';
        return;
      }
      if($scope.answer[i].char != translation.charAt(i)) {
        $scope.answerState = 'INCORRECT';
        return;
      }
    }
    $scope.answerState = 'CORRECT';
  };

  function initializeAnswer() {
    var answer = [];
    var answerLength = translation.length;
    for(var i = 0; i < answerLength; ++i) {
      answer[i] = {};
    }
    return answer;
  }
}]);
