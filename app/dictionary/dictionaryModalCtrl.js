(function() {
  'use strict';

  angular.module('words').controller('DictionaryModalCtrl', ['dictionaryManager', 'selectedWord', '$uibModalInstance',
  function(dictionaryManager, selectedWord, $uibModalInstance) {
    var vm = this;
    vm.selectedWord = selectedWord;
    vm.selectionError = {};
    vm.selectedImg = null;

    vm.addPopover = {};

    vm.addTranslation = function() {
      vm.addPopover.isOpen = false;
      dictionaryManager.addTranslation(vm.selectedWord.word, vm.addPopover.translation);
      vm.addPopover.translation = '';
    };

    vm.removeTranslation = function(translationIndex) {
      dictionaryManager.removeTranslation(vm.selectedWord.word, vm.selectedWord.translation[translationIndex]);
    };

    vm.uploadImg = function() {
      dictionaryManager.uploadImg(vm.selectedWord.word, vm.selectedImg).then(function() {
        vm.close();
      });
    };

    vm.close = function() {
      $uibModalInstance.close();
    };

  }]);
}());
