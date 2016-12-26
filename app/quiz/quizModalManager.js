(function(module) {
  'use strict';
  module.factory('quizModalManager', ['$state', '$uibModal', function($state, $uibModal) {
    return {
      finishModal: function(score, nextState) {
        var modal = $uibModal.open({
          templateUrl: 'quiz/finishModal.html',
          backdrop: 'static',
          size: 'md',
          controller: function() {
            var vm = this;
            vm.score = score;
            vm.close = function() {
              $state.go(nextState);
              modal.close();
            }
          },
          controllerAs: 'mc',
          windowClass: 'quiz_modal_window'
        });
      }
    }
  }]);
})(angular.module('words'));
