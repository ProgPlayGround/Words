(function() {
  'use strict';
  angular.module('words').factory('wordManager', ['batchLoader', function(batchLoader) {
    var words;
    return {
      init: function(url, onSuccess, onReject) {
        words = batchLoader.load(url);
        words.$promise.then(onSuccess, onReject);
      },
      getWord: function() {
        return words[0];
      },
      nextWord: function() {
        words.shift();
        return words[0];
      },
      hasNext: function() {
        return words.length > 1;
      }
    };
  }]);
})();
