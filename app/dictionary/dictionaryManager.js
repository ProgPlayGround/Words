(function(){
  'use strict';

  angular.module('words').factory('dictionaryManager', [function() {

    return {
      getWords: function() {
        return [
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
      }
    };
  }]);
}());
