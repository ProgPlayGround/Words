'use strict';

angular.module('words').factory('wordManager', function() {
  var data = [
    {
      'word': 'car',
      'category': 'common',
      'translation': {
        'ua': ['автомобіль'],
        'ru': ['автомобиль']
      }
    },
    {
      'word': 'defer',
      'category': 'common',
      'translation': {
        'ua': ['відкладувати'],
        'ru': ['отлаживать']
      }
    },
    {
      'word': 'affirm',
      'category': 'common',
      'translation': {
        'ua': ['стверджувати'],
        'ru': ['утверждать']
      }
    }
  ];

  return {
    getWords: function(index) {
      return data[index];
      }
  };
});
