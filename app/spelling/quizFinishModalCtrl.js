(function() {
  'use strict';
  angular.module('words').controller('QuizFinishModalCtrl', [
    '$state', '$uibModalInstance', 'scoreManager', 'nextState',
    function($state, $uibModalInstance, scoreManager, nextState) {
      var vm = this;
      vm.score = scoreManager.get();
      vm.close = function() {
        $state.go(nextState);
        $uibModalInstance.close();
      }
    }]);
}());
