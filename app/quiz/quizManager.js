(function() {
  'use strict';
  angular.module('words').factory('quizLoadManager', ['wordManager', 'quizUrl', function(wordManager, quizUrl) {
    var quiz;

    var factory = {
      init: function(callback) {
        factory.onLoad();
        // wordManager.init(quizUrl, function() {
        //   factory.onLoad();
        //   callback();
        // });
      },
      next: function() {
        return wordManager.nextWord();
      },
      onLoad: function() {
        quiz = {
          word: 'confirm',
          options: ['стверджувати', 'випробовувати', 'закохувати', 'спричиняти'],
          answer: 0
        };//wordManager.getWord();
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
  }]).constant('quizUrl', 'https://localhost:3000/quiz');
});
