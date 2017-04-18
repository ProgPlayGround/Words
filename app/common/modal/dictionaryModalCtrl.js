(function() {
  'use strict';
  angular.module('words').controller('DictionaryModalCtrl', ['$uibModalInstance', 'dictionaryManager', 'selectedWord',
  function($uibModalInstance, dictionaryManager, selectedWord) {
    var vm = this;

    vm.selectedWord = selectedWord;

    vm.addTranslation = function(word, translation) {
      dictionaryManager.addTranslation(word, translation);
      word.translation.shift(translation);
    };

    vm.updateTranslation = function(word, translationIndex, newTranslation) {
      dictionaryManager.updateTranslation(word, word.translation[translationIndex], newTranslation);
      word.translation[translationIndex] = newTranslation;
    };
  }]);
}());
