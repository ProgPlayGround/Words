(function() {
  'use strict';

  angular.module('words').controller('DictionaryCtrl', ['dictionaryManager', function(dictionaryManager) {
    var vm = this;

    vm.words = dictionaryManager.getWords();

    vm.sound = function(url) {
      console.log(url);
    };

  }]);
}());
