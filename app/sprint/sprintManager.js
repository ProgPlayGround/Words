(function() {
  angular.module('words').factory('sprintManager', ['wordManager', 'config', function(wordManager, config) {
    var current;
    var sprintUrl = config.apiUrl + '/sprint';

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
