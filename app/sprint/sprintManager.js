(function() {
  angular.module('words').factory('sprintManager', ['userService', 'wordManager', 'config', function(userService, wordManager, config) {
    var current, sprintUrl;

    var factory = {
      init: function(category, callback) {
        sprintUrl = config.apiUrl + '/sprint/' + userService.get() + '/' + category;
        wordManager.init(sprintUrl, function() {
          factory.onLoad();
          callback();
        });
      },
      onLoad: function() {
        current = wordManager.getWord();
      },
      word: function() {
        return current.word;
      },
      answer: function() {
        return current.guess;
      },
      isCorrect: function(answer) {
        var isCorrect = current.translation.indexOf(current.guess) !== -1;
        return answer === isCorrect;
      },
      next: function() {
        return wordManager.nextWord();
      },
      isLoaded: function() {
        return  angular.isDefined(current);
      },
      clear: function() {
        wordManager.clear();
        current = undefined;
      }
    };

    return factory;
  }]);
}());
