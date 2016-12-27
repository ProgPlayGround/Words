(function() {
  'use strict';
  angular.module('words').factory('quizModalManager', ['$uibModal', function($uibModal) {
    return {
      finishModal: function(nextState) {
        $uibModal.open({
          templateUrl: 'quiz/finishModal.html',
          backdrop: 'static',
          size: 'md',
          controller: 'QuizFinishModalCtrl',
          controllerAs: 'mc',
          resolve: {
            nextState: function() {
              return nextState;
            }
          },
          windowClass: 'quiz_modal_window'
        });
      }
    }
  }]);
})();
