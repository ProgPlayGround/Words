(function() {
  'use strict';

  angular.module('words').factory('dictionaryManager', ['wordEndpoint', 'config', function(wordEndpoint, config) {
    var dictionaryUrl = config.apiUrl + '/dictionary';
    var imageUrl = config.apiUrl + '/image';

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
          });
        }
      },
      remove: function(wordsToRemove) {
        wordsToRemove.forEach(function(elem) {
          var index = words.indexOf(elem);
          if(index !== -1) {
            words.splice(index, 1);
            wordEndpoint.delete(dictionaryUrl + '/' + elem.word);
          }
        });
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
          wordEndpoint.delete(dictionaryUrl + '/' + word + '/' + translation);
          wordCard.translation = _.without(wordCard.translation, translation);
        }
      },
      uploadImg: function(word, img) {
        var wordCard = find(word);
        if(wordCard) {
          return wordEndpoint.uploadImg(imageUrl + '/' + wordCard.word, img).$promise.then(function(res) {
            wordCard.imageUrl = res.url + '?' + Date.now();
          });
        }
      }
    };
  }]);
}());
