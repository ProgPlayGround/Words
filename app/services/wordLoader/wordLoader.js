'use strict';

angular.module('words').service('wordsLoaderService', [function() {
  this.getWords = function() {
    return {
      'word': 'car',
      'category': 'common',
      'translation': {
        'ua': ['автомобіль'],
        'ru': ['автомобиль']
      }
    };
  }
}]);
