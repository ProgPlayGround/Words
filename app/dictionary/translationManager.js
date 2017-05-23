(function(){
  'use strict';

  angular.module('words').factory('translationManager', ['wordEndpoint', 'config',
  function(wordEndpoint, config) {
    var translationUrl = config.apiUrl + '/translation/';
    return {
      translate: function(word) {
        return wordEndpoint.load(translationUrl + word);
      }
    };
  }]);
}());
