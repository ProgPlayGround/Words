'use strict';

angular.module('words').factory('wordManager', ['$q', 'wordLoader', function($q, wordLoader) {
  var words;
  var loadPromise = $q.defer();
  wordLoader.load().then(function(data) {
    words = data;
    loadPromise.resolve(words[0]);
  });

  return {
    getWord: function() {
      if(words) {
        loadPromise = $q.defer()
        loadPromise.resolve(words[0]);
      }
      return loadPromise.promise;
    },
    nextWord: function() {
      words.shift();
    },
    hasNext: function() {
      return angular.isDefined(words[1]);
    }
  };
}]);
