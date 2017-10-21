(function() {
  'use strict';
  angular.module('words')
  .factory('scoreManager', ['config', 'userService', 'wordEndpoint', function(config, userService, wordEndpoint) {
    var rankingUrl = config.apiUrl + '/profile/' + userService.get() + '/ranking';
    var score = wordEndpoint.load(rankingUrl, false);
    return {
      get: function() {
        return score;
      },
      onAnswer: function(points) {
        if(points > 0) {
          wordEndpoint.patch(rankingUrl, {'points': points}).$promise.then(function(data) {
              score.rank = data.rank;
              score.upPoints = data.upPoints;
          });
        }
      }
    };
  }])
  .factory('wordAnswerManager', ['config', 'userService', 'wordEndpoint', function(config, userService, wordEndpoint) {
    var wordAnswerUrl = config.apiUrl + '/dictionary/' + userService.get() + '/learned/';
    return {
      onAnswer: function(word, category, game) {
        wordEndpoint.patch(wordAnswerUrl + category + '/' + word, {'game': game});
      }
    };
  }])
}());
