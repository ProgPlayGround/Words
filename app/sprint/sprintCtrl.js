(function() {
  angular.module('words').controller('SprintCtrl', ['sprintManager', 'scoreManager', 'quizModalManager', function(sprintManager, scoreManager, quizModalManager) {
    var vm = this;
    vm.loadingText = 'Loading...';

    vm.word = sprintManager.word;
    vm.answer = sprintManager.answer;
    vm.score = scoreManager.get;
    vm.isLoaded = sprintManager.isLoaded;

    vm.loadQuestion = function() {
      quizManager.load();
      onLoad();
    };

    vm.onAnswer = function(answer) {
      if(sprintManager.isCorrect(answer)) {
        scoreManager.onAnswer('CORRECT');
      }
      vm.navigate();
    };

    vm.navigate = function() {
      if(sprintManager.next()) {
        vm.nav = true;
      } else {
        quizModalManager.finishModal('main');
      }
    };

    vm.onTimeFinished = function() {
      quizModalManager.finishModal('main');
    };

    function onLoad() {
      vm.nav = false;
    }

  }]);
}());
