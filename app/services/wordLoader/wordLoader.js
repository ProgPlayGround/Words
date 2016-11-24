'use strict';

angular.module('words').factory('wordLoader', function() {
  return {
    getWords: function() {
      return {
        'word': 'car',
        'category': 'common',
        'translation': {
          'ua': ['автомобіль'],
          'ru': ['автомобиль']
        }
      };
    }
  };
});
