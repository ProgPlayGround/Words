(function() {
  'use strict';

  angular.module('words').constant('dictionaryUrl', 'https://localhost:3000/dictionary').factory('dictionaryManager', ['wordEndpoint', 'dictionaryUrl',
   function(wordEndpoint, dictionaryUrl) {
    var words = wordEndpoint.load(dictionaryUrl);

    function find(word) {
      return _.find(words, function(current) {
        return current.word === word;
      });
    }

    return {
      getWords: function() {
        return words;
      },
      save: function(word, translation) {
        var wordCard = find(word);

        if(wordCard) {
          if(wordCard.translation.indexOf(translation) === -1) {
            wordCard.translation.push(translation);
            wordEndpoint.patch(dictionaryUrl, {'word': word, 'translation': translation});
          }
        } else {
          wordEndpoint.post(dictionaryUrl, {
            'word': word,
            'translation': translation
          }).$promise.then(function(response) {
            words.unshift(response);
          }).catch(function(err) {
            console.log(err);
          });
        }
      },
      addTranslation: function(word, translation) {
        var wordCard = find(word);
        if(wordCard && wordCard.translation.indexOf(translation) === -1) {
          wordCard.translation.push(translation);
          wordEndpoint.patch(dictionaryUrl, {'word': word, 'translation': translation});
        }
      },
      removeTranslation: function(word, translation) {
        var wordCard = find(word);
        if(wordCard) {
          wordCard.translation = _.without(wordCard.translation, translation);
        }
      }
    };
  }]);
}());
