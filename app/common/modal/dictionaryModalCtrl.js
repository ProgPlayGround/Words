(function() {
  'use strict';
  angular.module('words').controller('DictionaryModalCtrl', ['$uibModalInstance', 'dictionaryManager', 'selectedWord',
  function($uibModalInstance, dictionaryManager, selectedWord) {
    var vm = this;

    vm.selectedWord = selectedWord;

    vm.addTranslation = function(translation) {
      dictionaryManager.addTranslation(vm.selectedWord.word, translation);
      vm.selectedWord.translation.shift(translation);
    };

    vm.updateTranslation = function(translationIndex, newTranslation) {
      dictionaryManager.updateTranslation(vm.selectedWord.word, vm.selectedWord.translation[translationIndex], newTranslation);
      vm.selectedWord.translation[translationIndex] = newTranslation;
    };

    vm.removeTranslation = function(translationIndex) {
      dictionaryManager.removeTranslation(vm.selectedWord.word, vm.selectedWord.translation[translationIndex]);
      vm.selectedWord.translation.splice(translationIndex, 1);
    };

  }]);
}());
