(function() {
  'use strict';

  angular.module('words').controller('DictionaryCtrl', ['$log', 'dictionaryManager', 'translationManager', 'dictionaryModalManager',
  function($log, dictionaryManager, translationManager, dictionaryModalManager) {
    var vm = this;

    vm.words = dictionaryManager.getWords();
    vm.allChecked = false;
    vm.audios = {};

    vm.addPopover = {
      templateUrl: 'dictionary/addPopover.html'
    };

    vm.checkAll = function() {
      var hasUnchecked = _.some(vm.words, function(elem) {
        return !elem.checked;
      });
      _.each(vm.words, function(elem) {
        elem.checked = hasUnchecked ? true : vm.allChecked;
      });
    };

    vm.add = function() {
      translationManager.translate(vm.search).$promise.then(function(translation) {
        vm.addPopover.translation = translation[0];
      }, function(err) {
        $log.error(err);
      });
    };

    vm.save = function() {
      vm.addPopover.isOpen = false;
      dictionaryManager.save(vm.search, vm.addPopover.translation);
      vm.addPopover.translation = '';
      vm.search = '';
    };

    vm.sound = function(wordCard) {
      if(!vm.audios[wordCard.word]) {
        vm.audios[wordCard.word] = new Audio(wordCard.audioUrl);
      }
      vm.audios[wordCard.word].play();
    };

    vm.remove = function(word) {
      vm.words = _.reject(vm.words, function(elem) {
        return elem.word === word.word;
      });
    };

    vm.removeChecked = function() {
      vm.words = _.reject(vm.words, function(elem) {
        return elem.checked;
      });
    };

    vm.trainChecked = function() {
      $log.info(vm.words);
    };

    vm.checked = function() {
      return _.some(vm.words, function(elem) {
        return elem.checked;
      });
    };

    vm.showCard = function(word) {
      dictionaryModalManager.modal(word);
    };

  }]);
}());
