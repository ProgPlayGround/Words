'use strict';

angular.module('words').factory('scoreManager', function() {
  var score = 0;
  var points = 50;
  return {
    get: function() {
      return score;
    },
    onAnswer: function(state) {
      if(state == 'CORRECT') {
        score += points;
      }
      points = 50;
    },
    useSolution: function() {
      points = 0;
    },
    useHint: function() {
      points = 25;
    }
  };
});
