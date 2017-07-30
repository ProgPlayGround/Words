(function() {
  'use strict';
  angular.module('words').factory('quizModalManager', ['$uibModal', function($uibModal) {
    return {
      finishModal: function(nextState) {
        $uibModal.open({
          templateUrl: 'common/modal/finishModal.html',
          backdrop: 'static',
          controller: 'QuizFinishModalCtrl',
          controllerAs: 'mc',
          windowClass: 'finish-modal-layout',
          resolve: {
            nextState: function() {
              return nextState;
            }
          }
        });
      }
    }
  }]);
}());
