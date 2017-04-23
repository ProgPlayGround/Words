(function(){
  'use strict';

  angular.module('words').constant('translationUrl', 'https://localhost:3000/translation/')
  .factory('translationManager', ['wordEndpoint', 'translationUrl',
  function(wordEndpoint, url) {
    return {
      translate: function(word) {
        return wordEndpoint.load(url + word);
      }
    };
  }]);
}());
