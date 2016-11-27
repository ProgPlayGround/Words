'use strict';

angular.module('words').controller('SprintCtrl', ['wordManager',
function(wordManager) {
  var vm = this;

  vm.loadWord = function() {
    if(wordManager.has(vm.index)) {
      vm.data = wordManager.getWords(vm.index);
      vm.answerState = 'NA';
      vm.answer = _.times(vm.data.translation.ua[0].length, function() {
        return {};
      });
    }
  };

  vm.isCorrect = function() {
    return vm.answerState == 'CORRECT';
  }

  vm.checkAnswer = function() {
    var letters = _.countBy(vm.answer, function(data, index) {
      if(!data.char) {
        return 'empty';
      } else if(data.char != vm.data.translation.ua[0].charAt(index)) {
        return 'error';
      } else {
        return 'right';
      }
    });

    if(letters.error) {
      vm.answerState = 'INCORRECT';
    } else if (letters.empty) {
      vm.answerState = 'NA';
    } else {
      vm.answerState = 'CORRECT';
    }
  };

  vm.nextQuestion = function() {
    vm.index += 1;
    // vm.loadWord();
  };

  vm.index = 0;
  vm.loadWord();
}]);
