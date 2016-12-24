(function(module) {
  'use strict';
  module.controller('WordQuizCtrl', ['wordManager', 'scoreManager', '$uibModal',
  function(wordManager, scoreManager, $uibModal) {
    var vm = this;
    vm.loadingText = 'Loading...';
    vm.loading = true;
    wordManager.init(onLoad);

  //
    function onLoad() {
      vm.data = wordManager.getWord();
      vm.answer = _.times(vm.data.translation.ua[0].length, function() {
        return {};
      });
      vm.nav = false;
      vm.answerState = 'NA';
      vm.loading = false;
    }

    vm.loadQuestion = onLoad;
  //
    vm.isCorrect = function() {
      return vm.answerState == 'CORRECT';
    }
  //
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
  //
    vm.applyAnswer = function() {
      _.each(vm.answer, function(element, index) {
        element.char = vm.data.translation.ua[0][index];
      });
      scoreManager.useSolution();
    };
  //
    vm.startNavigation = function() {
      scoreManager.onAnswer(vm.answerState);
      if(wordManager.hasNext()) {
        vm.nav = true;
        wordManager.nextWord(vm.data.word);
      } else {
        finishQuiz();
      }
    };

    function finishQuiz() {
      var modal = $uibModal.open({
        templateUrl: 'quiz/finishModal.html',
        backdrop: 'static',
        size: 'md',
        controller: function(scoreManager) {
          var vm = this;
          vm.score = scoreManager.get();
          vm.close = function() {
            modal.close();
          }
        },
        controllerAs: 'mc',
        windowClass: 'quiz_modal_window'
      });
    }

    vm.hint = function() {
      scoreManager.useHint();
    };

    vm.score = function() {
      return scoreManager.get();
    };

  }]);

})(angular.module('words'));
