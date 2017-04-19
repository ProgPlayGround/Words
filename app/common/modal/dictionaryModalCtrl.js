(function() {
  'use strict';
  angular.module('words').controller('DictionaryModalCtrl', ['$uibModalInstance', 'dictionaryManager', 'selectedWord',
  function($uibModalInstance, dictionaryManager, selectedWord) {
    var vm = this;

    vm.selectedWord = selectedWord;

    vm.addPopover = {
      templateUrl: 'common/modal/addTranslationPopover.html'
    };

    vm.addTranslation = function() {
      vm.addPopover.isOpen = false;
      // vm.selectedWord.translation.unshift(vm.addPopover.translation);
      dictionaryManager.addTranslation(vm.selectedWord.word, vm.addPopover.translation);
      vm.addPopover.translation = '';
    };

    vm.removeTranslation = function(translationIndex) {
      // vm.selectedWord.translation.splice(translationIndex, 1);
      dictionaryManager.removeTranslation(vm.selectedWord.word, vm.selectedWord.translation[translationIndex]);
    };

  }]);
}());
