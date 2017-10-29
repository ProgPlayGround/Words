(function() {
  'use strict';

  angular.module('words').factory('dictionaryManager', ['$log', 'wordEndpoint', 'config', 'userService',
   function($log, wordEndpoint, config, userService) {
    var imageUrl = config.apiUrl + '/image/';

    var dictionaryUrl, words, category;

    function find(word) {
      return _.find(words, function(current) {
        return current.word === word;
      });
    };

    return {
      load: function(currentCategory) {
        dictionaryUrl = config.apiUrl + '/dictionary/' + userService.get() + '/';
        words = wordEndpoint.load(dictionaryUrl + currentCategory + '/false');
        category = currentCategory;
        return words;
      },
      getWords: function() {
        return words;
      },
      save: function(word, translation) {
        var wordCard = find(word);
        if(wordCard) {
          if(wordCard.translation.indexOf(translation) === -1) {
            wordCard.translation.push(translation);
            wordEndpoint.patch(dictionaryUrl + wordCard.category , {'word': word, 'translation': translation});
          }
        } else {
          wordEndpoint.post(dictionaryUrl + category, {
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
            wordEndpoint.delete(dictionaryUrl + elem.category + '/' + elem.word).$promise.then(function(res) {
              if(!res.success) {
                $log.error('Error has occured %s', res.err);
              }
            });
          }
        });
      },
      addTranslation: function(word, translation) {
        var wordCard = find(word);
        if(wordCard && wordCard.translation.indexOf(translation) === -1) {
          wordCard.translation.push(translation);
          wordEndpoint.patch(dictionaryUrl + wordCard.category, {'word': word, 'translation': translation}).$promise.then(function(res) {
            if(!res.success) {
              $log.error('Error has occured %s', res.err);
            }
          });
        }
      },
      removeTranslation: function(word, translation) {
        var wordCard = find(word);
        if(wordCard) {
          wordCard.translation = _.without(wordCard.translation, translation);
          wordEndpoint.delete(dictionaryUrl + wordCard.category + '/' + word + '/' + translation).$promise.then(function(res) {
            if(!res.success) {
              $log.error('Error has occured %s', res.err);
            }
          });
        }
      },
      uploadImg: function(word, img) {
        var wordCard = find(word);
        if(wordCard) {
          return wordEndpoint.uploadImg(imageUrl + userService.get() + '/' + wordCard.category + '/' + wordCard.word, img).$promise.then(function(res) {
            wordCard.imageUrl = res.url + '?' + Date.now();
          });
        }
      }
    };
  }]);
}());
