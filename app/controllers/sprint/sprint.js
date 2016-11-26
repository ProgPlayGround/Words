'use strict';

angular.module('words').controller('SprintCtrl', ['wordLoader',
function(wordLoader) {
  var vm = this;
  vm.index = 0;
  initWord();

  vm.isCorrect = function() {
    return vm.answerState == 'CORRECT';
  }

  vm.checkAnswer = function() {
    var answers = _.countBy(vm.answer, function(data, index) {
      if(!data.char) {
        return 'empty';
      } else if(data.char != vm.data.translation.ua[0].charAt(index)) {
        return 'error';
      } else {
        return 'right';
      }
    });

    if(answers.error) {
      vm.answerState = 'INCORRECT';
    } else if (answers.empty) {
      vm.answerState = 'NA';
    } else {
      vm.answerState = 'CORRECT';
    }
  };

  vm.nextQuestion = function() {
    vm.index += 1;
    initWord();
  };

  function initWord() {
    vm.data = wordLoader.getWords(vm.index);
    vm.answerState = 'NA';
    vm.answer = _.times(vm.data.translation.ua[0].length, function() {
      return {};
    });
  }
}]);
