(function() {
  'use strict';
  angular.module('words').factory('spellingManager', ['userService', 'wordManager', 'config', function(userService, wordManager, config) {
    var quiz, answer, answerState, dictionaryUrl;

    var factory = {
      init: function(category, callback) {
        dictionaryUrl = config.apiUrl + '/dictionary/' + userService.get() + '/' + category;
        wordManager.init(dictionaryUrl, function() {
          factory.onLoad();
          callback();
        });
      },
      next: function() {
        return wordManager.nextWord();
      },
      onLoad: function() {
        quiz = wordManager.getWord();
        answer = _.times(factory.translation().length, function() {
          return {};
        });
        answerState = 'NA';
      },
      applyAnswer: function () {
        _.each(answer, function(element, index) {
          element.char = factory.translation()[index];
        });
      },
      isCorrect: function() {
        return answerState === 'CORRECT';
      },
      checkAnswer: function() {
        var letters = _.countBy(answer, function(letter, index) {
          if(!letter.char) {
            return 'empty';
          } else if(letter.char.toLowerCase() !== factory.translation().charAt(index).toLowerCase()) {
            return 'error';
          }
        });

        if(letters.error) {
          answerState = 'INCORRECT';
        } else if (letters.empty) {
          answerState = 'NA';
        } else {
          answerState = 'CORRECT';
        }
      },
      state: function() {
        return answerState;
      },
      isLoaded: function() {
        return angular.isDefined(quiz);
      },
      word: function() {
        return quiz.word.toLowerCase();
      },
      translation: function() {
        return quiz.translation[0].toLowerCase();
      },
      definitions: function() {
        return quiz.samples;
      },
      answer: function() {
        return answer;
      }
    };

    return factory;
  }]);
}());
