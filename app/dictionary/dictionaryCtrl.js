(function() {
  'use strict';

  angular.module('words').controller('DictionaryCtrl', ['dictionaryManager', function(dictionaryManager) {
    var vm = this;

    vm.words = dictionaryManager.getWords();
    vm.allChecked = false;

    vm.checkAll = function() {
      var hasUnchecked = _.some(vm.words, function(elem) {
        return !elem.checked;
      });
      _.each(vm.words, function(elem) {
        elem.checked = hasUnchecked ? true : vm.allChecked;
      });
    };

    vm.add = function() {
      console.log(vm.search);
    };

    vm.sound = function(url) {
      console.log(url);
    };

    vm.remove = function(word) {
      console.log(word.word);
    };

    vm.removeChecked = function() {
      console.log(vm.words);
    };

    vm.checked = function() {
      return _.some(vm.words, function(elem) {
        return elem.checked;
      });
    };

  }]);
}());
