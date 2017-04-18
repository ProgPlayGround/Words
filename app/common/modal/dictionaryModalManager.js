(function() {
  'use strict';
  angular.module('words').factory('dictionaryModalManager', ['$uibModal', function($uibModal) {
    return {
      modal: function(word) {
        $uibModal.open({
          templateUrl: 'common/modal/dictionaryCard.html',
          animation: false,
          size: 'md',
          controller: 'DictionaryModalCtrl',
          controllerAs: 'dm',
          resolve: {
            selectedWord: function() {
              return word;
            }
          },
          windowClass: 'dictionary_modal_window'
        });
      }
    };
  }]);
}());
