(function() {
  'use strict';
  angular.module('words').constant('quizUrl', 'https://localhost:3000/quiz/').factory('quizManager', ['wordManager', 'quizUrl', function(wordManager, quizUrl) {
    var quiz;

    var factory = {
      init: function(lang, callback) {
        wordManager.init(quizUrl + lang, function() {
          factory.onLoad();
          callback();
        });
      },
      next: function() {
        return wordManager.nextWord();
      },
      onLoad: function() {
        quiz = wordManager.getWord();
      },
      isLoaded: function() {
        return angular.isDefined(quiz);
      },
      word: function() {

        return quiz.word;
      },
      options: function() {
        return quiz.options;
      },
      answer: function() {
        return quiz.answer;
      }
    };

    return factory;
  }]);
})();
