(function() {
  'use strict';
  angular.module('words').factory('dictionaryModalManager', ['$uibModal', function($uibModal) {
    return {
      wordCard: function(word) {
        $uibModal.open({
          templateUrl: 'common/modal/dictionaryCard.html',
          animation: false,
          size: 'sm',
          controller: 'DictionaryModalCtrl',
          controllerAs: 'dm',
          resolve: {
            selectedWord: function() {
              return word;
            }
          },
          windowClass: 'dictionary_word_window'
        });
      },
      addImg: function(word) {
        $uibModal.open({
          templateUrl: 'common/modal/addImg.html',
          animation: false,
          size: 'sm',
          controller: 'DictionaryModalCtrl',
          controllerAs: 'dm',
          resolve: {
            selectedWord: function() {
              return word;
            }
          },
          windowClass: 'dictionary_add_img_window'
        });
      }
    };
  }]);
}());
