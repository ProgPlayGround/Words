'use strict';

angular.module('words').service('wordsLoaderService', [function() {
  this.getWords = function() {
    return {
      'word': 'sequance',
      'category': 'common',
      'translation': {
        'ua': ['автомобіль'],
        'ru': ['автомобиль']
      }
    };
  }
}]);
