'use strict';

angular.module('words').controller('WordQuizCtrl', ['wordManager', 'scoreManager',
function(wordManager, scoreManager) {
  var vm = this;
  init();

  function init() {
    vm.data = wordManager.getWord();
    vm.nav = false;
    vm.answerState = 'NA';
    vm.answer = _.times(vm.data.translation.ua[0].length, function() {
      return {};
    });
  }

  vm.loadQuestion = init;

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

  vm.applyAnswer = function() {
    _.each(vm.answer, function(element, index) {
      element.char = vm.data.translation.ua[0][index];
    });
    scoreManager.useSolution();
  };

  vm.startNavigation = function() {
    scoreManager.onAnswer(vm.answerState);
    if(wordManager.hasNext()) {
      vm.nav = true;
      wordManager.nextWord(vm.data.word);
    } else {      
      //end quiz logic
    }
  };

  vm.hint = function() {
    scoreManager.useHint();
  };

  vm.score = function() {
    return scoreManager.get();
  };
}]);