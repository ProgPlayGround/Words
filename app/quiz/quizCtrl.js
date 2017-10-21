(function() {
  'use strict';

  function quizController(lang) {
    return function($scope, $stateParams, scoreManager, wordAnswerManager, quizManager, quizModalManager) {
      var vm = this;
      vm.loadingText = 'Loading...';
      vm.userAnswer = null;

      vm.category = $stateParams.category;
      quizManager.init(vm.category, lang, onLoad);

      vm.word = quizManager.word;
      vm.options = quizManager.options;
      vm.isLoaded = quizManager.isLoaded;

      vm.loadQuestion = function() {
        quizManager.onLoad();
        onLoad();
      };

      vm.applyAnswer = function(answer) {
        vm.userAnswer = angular.isDefined(answer) ? answer : -1;
        vm.correctAnswer = quizManager.answer(answer);

        if(vm.userAnswer === vm.correctAnswer) {
          scoreManager.onAnswer(1);
          wordAnswerManager.onAnswer(vm.word(), vm.category, 'quiz');
        }
      };

      vm.isAnswered = function() {
        return vm.userAnswer !== null;
      };

      vm.onNavigation = function() {
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

  angular.module('words').controller('EnQuizCtrl', ['$scope', '$stateParams', 'scoreManager', 'wordAnswerManager', 'quizManager', 'quizModalManager', quizController('en')]);
  angular.module('words').controller('UaQuizCtrl', ['$scope', '$stateParams', 'scoreManager', 'wordAnswerManager', 'quizManager', 'quizModalManager', quizController('ua')]);
}());
