'use strict';

angular.module('words').factory('wordManager', ['wordLoader', function(wordLoader) {
  var data = wordLoader.load();
  return {
    getWord: function(index) {
      return data[index];
    },
    has: function(index) {
      return angular.isDefined(data[index]);
    }
  };
}]);
