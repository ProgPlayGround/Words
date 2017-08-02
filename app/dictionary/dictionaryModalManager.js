(function() {
  'use strict';
  angular.module('words').factory('dictionaryModalManager', ['$uibModal', function($uibModal) {
    return {
      wordCard: function(word) {
        $uibModal.open({
          templateUrl: 'dictionary/dictionaryCard.html',
          animation: false,
          size: 'md',
          controller: 'DictionaryModalCtrl',
          controllerAs: 'dm',
          resolve: {
            selectedWord: function() {
              return word;
            }
          },
          windowClass: 'dictionary-word-layout'
        });
      },
      addImg: function(word) {
        $uibModal.open({
          templateUrl: 'dictionary/addImg.html',
          animation: false,
          controller: 'DictionaryModalCtrl',
          controllerAs: 'dm',
          resolve: {
            selectedWord: function() {
              return word;
            }
          },
          windowClass: 'dictionary-add-img-layout'
        });
      }
    };
  }]);
}());
