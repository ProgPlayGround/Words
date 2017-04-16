(function() {
  'use strict';

  angular.module('words').controller('DictionaryCtrl', ['dictionaryManager', 'translationManager',
  function(dictionaryManager, translationManager) {
    var vm = this;

    vm.words = dictionaryManager.getWords();
    vm.allChecked = false;

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
        console.log(err);
      });
    };

    vm.save = function() {
      vm.addPopover.isOpen = false;
      vm.words.push({
        word: vm.search,
        translation: vm.addPopover.translation,
        audioUrl: '',
        imageUrl: ''
      });
      vm.addPopover.translation = '';
    };

    vm.sound = function(url) {
      console.log(url);
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
      console.log(vm.words);
    };

    vm.checked = function() {
      return _.some(vm.words, function(elem) {
        return elem.checked;
      });
    };

  }]);
}());
