(function() {
  'use strict';
  angular.module('words').constant('dictionaryUrl', 'https://localhost:3000/dictionary')
  .factory('spellingManager', ['wordManager', 'dictionaryUrl', function(wordManager, dictionaryUrl) {
    var quiz, answer, answerState;

    var factory = {
      init: function(callback) {
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
          } else if(letter.char !== factory.translation().charAt(index)) {
            return 'error';
          } else {
            return 'right';
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
        return quiz.word;
      },
      translation: function() {
        return quiz.translation.ua[0];
      },
      definition: function() {
        return quiz.definition;
      },
      inSentence: function() {
        return quiz.inSentence;
      },
      answer: function() {
        return answer;
      }
    };

    return factory;
  }]);
}());
