'use strict';

angular.module('words').controller('SprintCtrl', ['$scope', 'wordsLoaderService',
function($scope, wordsLoaderService) {
  $scope.data = wordsLoaderService.getWords();
  var translation = $scope.data.translation.ua[0];
  $scope.answer = initializeAnswer();
  $scope.answerState = 'NA';

  $scope.isCorrect = function() {
    return $scope.answerState=='CORRECT';
  }

  $scope.checkAnswer = function() {
    var error = 0;
    var empty = 0;
    for(var i = 0; i < $scope.answer.length; ++i) {
      if(!$scope.answer[i].char) {
        ++empty;
      } else if($scope.answer[i].char != translation.charAt(i)) {
        ++error;
      }
    }

    if(error != 0) {
      $scope.answerState = 'INCORRECT';
    } else if (empty != 0) {
      $scope.answerState = 'NA';
    } else {
      $scope.answerState = 'CORRECT';
    }
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
