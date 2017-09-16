(function() {
  angular.module('words').controller('SprintCtrl',
  ['$scope', '$stateParams', 'sprintManager', 'scoreManager', 'wordAnswerManager', 'quizModalManager',
   function($scope, $stateParams, sprintManager, scoreManager, wordAnswerManager, quizModalManager) {
    var vm = this;
    vm.loadingText = 'Loading...';
    vm.isFinished = false;

    vm.category = $stateParams.category;
    vm.word = sprintManager.word;
    vm.answer = sprintManager.answer;
    vm.score = scoreManager.get;
    vm.isLoaded = sprintManager.isLoaded;

    sprintManager.init(vm.category, onLoad);

    vm.loadQuestion = function() {
      sprintManager.onLoad();
      onLoad();
    };

    vm.onAnswer = function(answer) {
      if(sprintManager.isCorrect(answer)) {
        scoreManager.onAnswer(1);
        wordAnswerManager.onAnswer(vm.word(), vm.category, 'sprint');
      }
      vm.navigate();
    };

    vm.navigate = function() {
      if(sprintManager.next()) {
        vm.nav = true;
      } else {
        vm.isFinished = true;
        quizModalManager.finishModal('main');
      }
    };

    vm.onTimeFinished = function() {
      if(!vm.isFinished) {
        quizModalManager.finishModal('main');
      }
    };

    $scope.$on('$stateChangeStart', function() {
      sprintManager.clear();
    });

    function onLoad() {
      vm.nav = false;
    }

  }]);
}());
