(function() {
  'use strict';
  angular.module('words').controller('QuizCtrl', ['scoreManager', 'quizManager', function(scoreManager, quizManager) {
    var vm = this;
    vm.loadingText = 'Loading...';

    quizManager.init(onLoad);

    vm.word = quizManager.word;
    vm.options = quizManager.options;

    vm.loadQuestion = function() {
      quizManager.onLoad();
      onLoad();
    };

    vm.applyAnswer = function(answer) {
      vm.correctAnswer = quizManager.answer();
      vm.userAnswer = answer;
    };

    vm.isAnswered = function() {
      return vm.userAnswer != null;
    };

    vm.onNavigation = function() {
      scoreManager.onAnswer(vm.userAnswer == null ? 'NA' : vm.userAnswer == vm.correctAnswer ? 'CORRECT': 'INCORRECT');
      if(quizManager.next()) {
        vm.nav = true;
      } else {
        console.log('hey');
      }
    };

    function onLoad() {
      vm.correctAnswer = null;
      vm.userAnswer = null;
      vm.nav = false;
    }
  }]);
})();
