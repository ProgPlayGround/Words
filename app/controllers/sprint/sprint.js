'use strict';

angular.module('words').controller('SprintCtrl', ['$scope', 'wordLoader',
function($scope, wordLoader) {
  var vm = this;
  vm.data = wordLoader.getWords();
  var translation = vm.data.translation.ua[0];
  vm.answer = initializeAnswer();
  vm.answerState = 'NA';

  vm.isCorrect = function() {
    return vm.answerState=='CORRECT';
  }

  vm.checkAnswer = function() {
    var error = 0;
    var empty = 0;
    for(var i = 0; i < vm.answer.length; ++i) {
      if(!vm.answer[i].char) {
        ++empty;
      } else if(vm.answer[i].char != translation.charAt(i)) {
        ++error;
      }
    }

    if(error != 0) {
      vm.answerState = 'INCORRECT';
    } else if (empty != 0) {
      vm.answerState = 'NA';
    } else {
      vm.answerState = 'CORRECT';
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
