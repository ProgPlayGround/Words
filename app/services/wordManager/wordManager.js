'use strict';

angular.module('words').factory('wordManager', ['wordLoader', function(wordLoader) {
  var words;
  return {
    init: function(onSuccess, onReject) {
      words = wordLoader.allWords();
      words.$promise.then(onSuccess, onReject);
    },
    getWord: function() {
      return words[0];
    },
    nextWord: function() {
      words.shift();
    },
    hasNext: function() {
      return angular.isDefined(words[1]);
    }
  };
}]);
