'use strict';

angular.module('words').factory('wordManager', ['wordLoader', function(wordLoader) {
  var words = wordLoader.load();
  return {
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
