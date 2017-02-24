(function() {
  'use strict';
  angular.module('words').controller('WordQuizCtrl', ['spellingManager', 'quizModalManager', 'scoreManager',
  function(spellingManager, quizModalManager, scoreManager) {
    var vm = this;
    vm.loadingText = 'Loading...';
    spellingManager.init(afterLoad);

    vm.loadQuestion = function() {
      spellingManager.onLoad();
      afterLoad();
    };

    vm.applyAnswer = function() {
      spellingManager.applyAnswer();
      scoreManager.useSolution();
    };

    vm.onNavigation = function() {
      scoreManager.onAnswer(spellingManager.state());
      if(spellingManager.next()) {
        vm.nav = true;
      } else {
        quizModalManager.finishModal('main');
      }
    };

    vm.hint = scoreManager.useHint;
    vm.score = scoreManager.get;
    vm.isCorrect = spellingManager.isCorrect;
    vm.checkAnswer = spellingManager.checkAnswer;
    vm.isLoaded = spellingManager.isLoaded;
    vm.answerState = spellingManager.state;
    vm.word = spellingManager.word;
    vm.translation = spellingManager.translation;
    vm.answer = spellingManager.answer;
    vm.definition = spellingManager.definition;
    vm.inSentence = spellingManager.inSentence;

    function afterLoad() {
      vm.nav = false;
    }
  }]);
}());
