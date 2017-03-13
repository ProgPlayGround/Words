(function() {
  angular.module('words').controller('SprintCtrl', ['$scope', 'sprintManager', 'scoreManager', 'quizModalManager', function($scope, sprintManager, scoreManager, quizModalManager) {
    var vm = this;
    vm.loadingText = 'Loading...';

    vm.word = sprintManager.word;
    vm.answer = sprintManager.answer;
    vm.score = scoreManager.get;
    vm.isLoaded = sprintManager.isLoaded;

    sprintManager.init(onLoad);

    vm.loadQuestion = function() {
      sprintManager.onLoad();
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

    $scope.$on('$stateChangeStart', function() {
      sprintManager.clear();
    });

    function onLoad() {
      vm.nav = false;
    }

  }]);
}());
