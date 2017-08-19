(function() {
  'use strict';

  function quizController(lang) {
    return function($scope, $stateParams, scoreManager, quizManager, quizModalManager) {
      var vm = this;
      vm.loadingText = 'Loading...';
      vm.userAnswer = null;

      vm.category = $stateParams.category;
      quizManager.init(vm.category, lang, onLoad);

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
        scoreManager.onAnswer(vm.userAnswer === vm.correctAnswer ? 1 : 0);
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

  angular.module('words').controller('EnQuizCtrl', ['$scope', '$stateParams', 'scoreManager', 'quizManager', 'quizModalManager', quizController('en')]);
  angular.module('words').controller('UaQuizCtrl', ['$scope', '$stateParams', 'scoreManager', 'quizManager', 'quizModalManager', quizController('ua')]);
}());
