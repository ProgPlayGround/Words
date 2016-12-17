'use strict';

angular.module('words').factory('wordManager', ['wordLoader', function(wordLoader) {
  var words;
  return {
    init: function(callback) {
      words = wordLoader.query();
      words.$promise.then(callback);
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
