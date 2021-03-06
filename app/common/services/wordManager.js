(function() {
  'use strict';
  angular.module('words').factory('wordManager', ['wordEndpoint', function(wordEndpoint) {
    var words;
    return {
      init: function(url, onSuccess, onReject) {
        words = wordEndpoint.load(url);
        words.$promise.then(onSuccess, onReject);
      },
      getWord: function() {
        return words[0];
      },
      nextWord: function() {
        words.shift();
        return angular.isDefined(words[0]);
      },
      hasNext: function() {
        return words.length > 1;
      },
      clear: function() {
        words.length = 0;
      }
    };
  }]);
}());
