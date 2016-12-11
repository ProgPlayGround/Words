'use strict';

angular.module('words').factory('wordLoader', function() {
  var data = [
    {
      'word': 'car',
      'category': 'common',
      'definition': ['an automobile.', 'a vehicle running on rails, as a streetcar or railroad car.', 'the part of an elevator, balloon, modern airship, etc., that carries the passengers, freight, etc.'],
      'inSentence': ['I\'ll wait in the car.', 'He got into the car and drove away.', 'She bought a new car.'],
      'translation': {
        'ua': ['автомобіль'],
        'ru': ['автомобиль']
      }
    },
    {
      'word': 'defer',
      'category': 'common',
      'definition': [ 'put off, delay', 'to postpone induction of (a person) into military service'],
      'inSentence': ['Critics say it will cause patients to defer needed treatment', 'There was still no improvement in the countess\' health, but it was impossible to defer the journey to Moscow any longer.'],
      'translation': {
        'ua': ['відкладувати'],
        'ru': ['отлаживать']
      }
    },
    {
      'word': 'affirm',
      'category': 'common',
      'definition': [ 'to testify or declare by affirmation as distinguished from swearing an oath', 'to uphold a judgment or decree of a lower court', 'to postpone induction of (a person) into military service'],
      'inSentence': ['We cannot affirm that this painting is genuine.', 'They neither affirmed nor denied their guilt.', 'Laws affirming the racial equality of all peoples'],
      'translation': {
        'ua': ['стверджувати'],
        'ru': ['утверждать']
      }
    }
  ];

  return {
    load: function() {
      return data;
    }
  }
});
