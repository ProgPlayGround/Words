(function() {
  'use strict';

  function quizController(lang) {
    return function($scope, scoreManager, quizManager, quizModalManager) {
      var vm = this;
      vm.loadingText = 'Loading...';
      vm.userAnswer = null;

      quizManager.init(lang, onLoad);

      vm.word = quizManager.word;
      vm.options = quizManager.options;
      vm.score = scoreManager.get;
      vm.isLoaded = quizManager.isLoaded;

      vm.loadQuestion = function() {
        quizManager.onLoad();
        onLoad();
      };

      vm.applyAnswer = function(answer) {
        vm.userAnswer = angular.isDefined(answer) ? answer : -1;
        vm.correctAnswer = quizManager.answer(answer);
      };

      vm.isAnswered = function() {
        return vm.userAnswer !== null;
      };

      vm.onNavigation = function() {
        scoreManager.onAnswer(vm.userAnswer === null ? 'NA' : vm.userAnswer === vm.correctAnswer ? 'CORRECT': 'INCORRECT');
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

      $scope.$on('$stateChangeStart', function() {
        quizManager.clear();
      });
    }
  }

  angular.module('words').controller('EnQuizCtrl', ['$scope', 'scoreManager', 'quizManager', 'quizModalManager', quizController('en')]);
  angular.module('words').controller('UaQuizCtrl', ['$scope', 'scoreManager', 'quizManager', 'quizModalManager', quizController('ua')]);
}());
