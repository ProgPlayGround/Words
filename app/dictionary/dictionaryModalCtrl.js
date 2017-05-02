(function() {
  'use strict';
  angular.module('words').controller('DictionaryModalCtrl', ['dictionaryManager', 'selectedWord', '$uibModalInstance',
  function(dictionaryManager, selectedWord, $uibModalInstance) {
    var vm = this;

    vm.selectedWord = selectedWord;
    vm.selectionError = false;
    vm.selectedImg = null;

    vm.addPopover = {
      templateUrl: 'dictionary/addTranslationPopover.html'
    };

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
        $uibModalInstance.close();
      });
    };

    vm.close = function() {
      $uibModalInstance.close();
    };

  }]);
}());
