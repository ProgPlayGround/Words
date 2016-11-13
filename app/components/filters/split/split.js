'use strict';

angular.module('words').filter('split', [function() {
  return function(text, symbol) {
      return text.split(symbol);
  };
}]);
