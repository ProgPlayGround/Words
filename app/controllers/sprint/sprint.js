'use strict';

angular.module('words').controller('SprintCtrl', ['wordManager',
function(wordManager) {
  var vm = this;
  vm.index = 0;
  init();

  function init() {
    vm.data = wordManager.getWord(vm.index);
    vm.answerState = 'NA';
    vm.answer = _.times(vm.data.translation.ua[0].length, function() {
      return {};
    });
  }

  vm.onWordLoad = init;

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
  };

  vm.nextWord = function() {
    if(wordManager.has(vm.index + 1)) {
      vm.index += 1;
    }
  };
}]);
