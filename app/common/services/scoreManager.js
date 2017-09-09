(function() {
  'use strict';
  angular.module('words').factory('scoreManager', ['config', 'userService', 'wordEndpoint', function(config, userService, wordEndpoint) {
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
  }]);
}());
