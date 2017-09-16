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
          score = wordEndpoint.patch(rankingUrl, {'points': points});
        }
      }
    };
  }])
  .factory('wordAnswerManager', ['config', 'userService', 'wordEndpoint', function(config, userService, wordEndpoint) {
    var wordAnswerUrl = config.apiUrl + '/dictionary/' + userService.get() + '/learned/';
    return {
      onAnswer: function(word, category, game) {
        console.log(1);
        wordEndpoint.patch(wordAnswerUrl + category + '/' + word, {'game': game});
      }
    };
  }])
}());
