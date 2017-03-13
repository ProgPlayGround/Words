(function() {
  angular.module('words').constant('sprintUrl', 'https://localhost:3000/sprint').factory('sprintManager', ['wordManager', 'sprintUrl', function(wordManager, sprintUrl) {
    var current;

    var factory = {
      init: function(callback) {
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
        return answer === current.answer;
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
