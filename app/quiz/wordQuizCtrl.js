(function() {
  'use strict';
  angular.module('words').controller('WordQuizCtrl', ['quizManager', 'quizModalManager', 'scoreManager',
  function(quizManager, quizModalManager, scoreManager) {
    var vm = this;
    vm.loadingText = 'Loading...';
    quizManager.init(afterLoad);

    vm.loadQuestion = function() {
      quizManager.onLoad();
      afterLoad();
    };

    vm.applyAnswer = function() {
      quizManager.applyAnswer();
      scoreManager.useSolution();
    };

    vm.onNavigation = function() {
      scoreManager.onAnswer(quizManager.state());
      if(quizManager.next()) {
        vm.nav = true;
      } else {
        quizModalManager.finishModal('main');
      }
    };

    vm.hint = scoreManager.useHint;
    vm.score = scoreManager.get;
    vm.isCorrect = quizManager.isCorrect;
    vm.checkAnswer = quizManager.checkAnswer;
    vm.isLoaded = quizManager.isLoaded;
    vm.answerState = quizManager.state;
    vm.word = quizManager.word;
    vm.translation = quizManager.translation;
    vm.answer = quizManager.answer;
    vm.definition = quizManager.definition;
    vm.inSentence = quizManager.inSentence;

    function afterLoad() {
      vm.nav = false;
    }
  }]);

})();
