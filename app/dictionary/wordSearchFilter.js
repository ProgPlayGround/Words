(function() {
  'use strict';

  angular.module('words').filter('wordSearchFilter', function() {
    return function(words, criteria) {
      criteria = criteria.toLowerCase();
      var searchPredicate = function(elem) {
        return elem.toLowerCase().includes(criteria);
      };

      return words.filter(function(elem) {
        return elem.word.toLowerCase().includes(criteria) || _.findIndex(elem.translation, searchPredicate) !== -1;
      });
    }
  });
}());
