(function(){
  'use strict';

  angular.module('words').factory('dictionaryManager', [function() {
    var words = [
      {
        word: 'word',
        translation: ['слово'],
        audioUrl: '',
        imageUrl: ''
      },
      {
        word: 'hello',
        translation: ['привіт'],
        audioUrl: '',
        imageUrl: ''
      },
      {
        word: 'blossom',
        translation: ['розцвітати'],
        audioUrl: '',
        imageUrl: ''
      },
      {
        word: 'correspond',
        translation: ['відповитати'],
        audioUrl: '',
        imageUrl: ''
      },
      {
        word: 'severity',
        translation: ['труднощі'],
        audioUrl: '',
        imageUrl: ''
      },
      {
        word: 'stage',
        translation: ['естрада'],
        audioUrl: '',
        imageUrl: ''
      },
      {
        word: 'carry-on',
        translation: ['ручний багаж'],
        audioUrl: '',
        imageUrl: ''
      },
      {
        word: 'embassy',
        translation: ['посольство'],
        audioUrl: '',
        imageUrl: ''
      },
      {
        word: 'haggle',
        translation: ['торговатись'],
        audioUrl: '',
        imageUrl: ''
      }
    ];

    function find(word) {
      return _.find(words, function(current) {
        return current.word === word;
      });
    }

    return {
      getWords: function() {
        return words;
      },
      addTranslation: function(word, translation) {
        var wordCard = find(word);
        wordCard.translation.push(translation);
      },
      updateTranslation: function(word, oldTranslation, newTranslation) {
        var wordCard = find(word);
        var position = wordCard.translation.indexOf(oldTranslation);
        if(position !== -1) {
          wordCard.translation[position] = newTranslation;
        }
      },
      removeTranslation: function(word, translation) {
        var wordCard = find(word);
        wordCard.translation = _.without(word.translation, translation);
      }
    };
  }]);
}());
