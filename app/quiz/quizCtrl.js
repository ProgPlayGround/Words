(function() {
  'use strict';
  angular.module('words').controller('QuizCtrl', ['scoreManager', 'quizManager', 'quizModalManager', function(scoreManager, quizManager, quizModalManager) {
    var vm = this;
    vm.loadingText = 'Loading...';

    quizManager.init('en', onLoad);

    vm.word = quizManager.word;
    vm.options = quizManager.options;
    vm.score = scoreManager.get;
    vm.isLoaded = quizManager.isLoaded;

    vm.loadQuestion = function() {
      quizManager.onLoad();
      onLoad();
    };

    vm.applyAnswer = function(answer) {
      vm.correctAnswer = quizManager.answer();
      vm.userAnswer = angular.isDefined(answer) ? answer : -1;
    };

    vm.isAnswered = function() {
      return vm.userAnswer != null;
    };

    vm.onNavigation = function() {
      scoreManager.onAnswer(vm.userAnswer == null ? 'NA' : vm.userAnswer == vm.correctAnswer ? 'CORRECT': 'INCORRECT');
      if(quizManager.next()) {
        vm.nav = true;
        vm.correctAnswer = null;
        vm.userAnswer = null;
      } else {
        quizModalManager.finishModal('main');
      }
    };

    function onLoad() {
      vm.nav = false;
    }
  }]);
})();
