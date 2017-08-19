(function() {
  'use strict';
  angular.module('words').controller('WordQuizCtrl', ['$stateParams', 'spellingManager', 'quizModalManager', 'scoreManager',
  function($stateParams, spellingManager, quizModalManager, scoreManager) {
    var vm = this;

    var score = 2;

    vm.loadingText = 'Loading...';

    vm.category = $stateParams.category;
    spellingManager.init(vm.category, afterLoad);

    vm.loadQuestion = function() {
      spellingManager.onLoad();
      afterLoad();
    };

    vm.applyAnswer = function() {
      spellingManager.applyAnswer();
      score = 0;
    };

    vm.onNavigation = function() {
      vm.rank();
      if(spellingManager.next()) {
        vm.nav = true;
      } else {
        quizModalManager.finishModal('main');
      }
    };

    vm.hint = function() {
      score = 1;
    };

    vm.rank = function() {
      scoreManager.onAnswer(score);
      score = 2;
    };

    vm.score = scoreManager.get;
    vm.isCorrect = spellingManager.isCorrect;
    vm.checkAnswer = spellingManager.checkAnswer;
    vm.isLoaded = spellingManager.isLoaded;
    vm.answerState = spellingManager.state;
    vm.word = spellingManager.word;
    vm.translation = spellingManager.translation;
    vm.answer = spellingManager.answer;
    vm.definitions = spellingManager.definitions;

    function afterLoad() {
      vm.nav = false;
    }
  }]);
}());
