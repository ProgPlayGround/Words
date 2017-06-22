'use strict';

describe('Dictionary manager', function() {
  var words, wordEndpoint, dictionaryUrl, imageUrl, dictionaryManagerService;

    beforeEach(function() {
      module('words');
      module(['$provide', function($provide) {
        words = [{
          word: 'translation',
          translation: ['переклад'],
          imageUrl: 'imageUrl',
          audioUrl: 'audioUrl'
        },
        {
          word: 'prefix',
          translation: ['префікс'],
          imageUrl: 'imageUrl',
          audioUrl: 'audioUrl'
        }];

        wordEndpoint = {
          'load': jasmine.createSpy('load').and.returnValue(words),
          'patch': jasmine.createSpy('patch').and.callThrough(),
          'post': jasmine.createSpy('post').and.returnValue({
            '$promise': {
              'then': function(response) {
                response({'word': 'name', 'translation': 'ім\'я'});
              }
            }
          }),
          'delete': jasmine.createSpy('delete').and.callThrough(),
          'uploadImg': jasmine.createSpy('uplaodImg').and.returnValue({
            '$promise': {
              'then': function(response) {
                response({'url': 'newImageUrl'});
              }
            }
          })
        };

        $provide.value('wordEndpoint', wordEndpoint);
      }]);
      inject(['dictionaryManager', 'config', function(dictionaryManager, config) {
        dictionaryManagerService = dictionaryManager;
        imageUrl = config.apiUrl + '/image';
        dictionaryUrl = config.apiUrl + '/dictionary';
      }]);
    });

    it('load words using word endpoint', function() {
      expect(wordEndpoint.load).toHaveBeenCalledWith(dictionaryUrl);
    });

    it('getWords returns loaded words', function() {
      var dictionaryWords = dictionaryManagerService.getWords();
      expect(dictionaryWords).toEqual(words);
    });

    it('save translation that doesn\'t exist', function() {
      var expectedTranslation = ['переклад', 'новий переклад'];
      dictionaryManagerService.save('translation', 'новий переклад');
      expect(words[0].translation.length).toBe(2);
      expect(wordEndpoint.patch).toHaveBeenCalledWith(dictionaryUrl, {'word': 'translation', 'translation': 'новий переклад'});
      _.each(words[0].translation, function(elem, index) {
        expect(elem).toEqual(expectedTranslation[index]);
      });
    });

    it('save doesn\'t save translation that exists', function() {
      var expectedTranslation = ['переклад'];
      dictionaryManagerService.save('translation', 'переклад');
      expect(words[0].translation.length).toBe(1);
      expect(wordEndpoint.patch).not.toHaveBeenCalled();
      _.each(words[0].translation, function(elem, index) {
        expect(elem).toEqual(expectedTranslation[index]);
      });
    });

    it('save word when it doesn\'t exist', function() {
      dictionaryManagerService.save('name', 'ім\'я');
      expect(words.length).toBe(3);
      expect(wordEndpoint.post).toHaveBeenCalledWith(dictionaryUrl, {
        'word': 'name',
        'translation': 'ім\'я'
      });
      expect(words[0]).toEqual({word: 'name', translation: 'ім\'я'});
    });

    it('remove words that exists', function() {
      var wordsToRemove = [words[0], {
        word: 'enumeration',
        translation: ['перечислення'],
        imageUrl: 'imageUrl',
        audioUrl: 'audioUrl'
      }];
      dictionaryManagerService.remove(wordsToRemove);
      expect(words.length).toBe(1);
      expect(wordEndpoint.delete).toHaveBeenCalledWith(dictionaryUrl + '/' + wordsToRemove[0].word);
    });

    it('addTranslation adds translation that doesn\'t exist', function() {
      var expectedTranslation = ['переклад', 'новий переклад'];
      dictionaryManagerService.addTranslation('translation', 'новий переклад');
      expect(words[0].translation.length).toBe(2);
      expect(wordEndpoint.patch).toHaveBeenCalled();
      _.each(words[0].translation, function(elem, index) {
        expect(elem).toEqual(expectedTranslation[index]);
      });
    });

    it('addTranslation doesn\'t save translation that exists', function() {
      var expectedTranslation = ['переклад'];
      dictionaryManagerService.addTranslation('translation', 'переклад');
      expect(words[0].translation.length).toBe(1);
      expect(wordEndpoint.patch).not.toHaveBeenCalled();
      _.each(words[0].translation, function(elem, index) {
        expect(elem).toEqual(expectedTranslation[index]);
      });
    });

    it('removeTranslation removes existed translation', function() {
      dictionaryManagerService.removeTranslation('translation', 'переклад');
      expect(words[0].translation.length).toBe(0);
      expect(wordEndpoint.delete).toHaveBeenCalledWith(dictionaryUrl + '/translation/переклад');
    });

    it('upload image update existed word image url', function() {
      dictionaryManagerService.uploadImg('translation', 'image');
      expect(wordEndpoint.uploadImg).toHaveBeenCalledWith(imageUrl + '/translation', 'image');
    });
});
