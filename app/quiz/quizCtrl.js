(function() {
  'use strict';
  angular.module('words').controller('QuizCtrl', ['scoreManager', 'quizLoadManager', function(scoreManager, quizManager) {
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

    function onLoad() {
      vm.correctAnswer = null;
      vm.userAnswer = null;
    }
  }]);
})();
