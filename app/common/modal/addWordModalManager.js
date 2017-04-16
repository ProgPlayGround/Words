(function() {
  'use strict';
  angular.module('words').factory('addWordModalManager', ['$uibModal', function($uibModal) {
    return {
      modal: function() {
        $uibModal.open({
          templateUrl: 'common/modal/finishModal.html',
          backdrop: 'static',
          size: 'md',
          controller: 'QuizFinishModalCtrl',
          controllerAs: 'mc',
          windowClass: 'quiz_modal_window'
        });
      }
    }
  }]);
}());
