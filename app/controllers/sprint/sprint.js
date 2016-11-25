'use strict';

angular.module('words').controller('SprintCtrl', ['wordLoader',
function(wordLoader) {
  var vm = this;
  vm.data = wordLoader.getWords();
  var translation = vm.data.translation.ua[0];
  vm.answer = _.times(translation.length, function() {
    return {};
  });
  vm.answerState = 'NA';

  vm.isCorrect = function() {
    return vm.answerState == 'CORRECT';
  }

  vm.checkAnswer = function() {
    var answers = _.countBy(vm.answer, function(data, index) {
      if(!data.char) {
        return 'empty';
      } else if(data.char != translation.charAt(index)) {
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
}]);
