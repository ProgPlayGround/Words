(function() {
  'use strict';
  angular.module('words').controller('WordQuizCtrl', ['$stateParams', 'spellingManager', 'quizModalManager', 'scoreManager',
  function($stateParams, spellingManager, quizModalManager, scoreManager) {
    var vm = this;
    vm.loadingText = 'Loading...';

    vm.category = $stateParams.category;
    spellingManager.init(vm.category, afterLoad);

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
    vm.definitions = spellingManager.definitions;

    function afterLoad() {
      vm.nav = false;
    }
  }]);
}());
