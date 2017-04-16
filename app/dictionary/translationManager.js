(function(){
  'use strict';

  angular.module('words').constant('translationUrl', 'https://localhost:3000/translation/')
  .factory('translationManager', ['batchLoader', 'translationUrl',
  function(batchLoader, url) {
    return {
      translate: function(word) {
        return batchLoader.load(url + word);
      }
    };
  }]);
}());
