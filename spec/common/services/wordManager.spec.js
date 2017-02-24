'use strict';

describe('word manager service', function() {
  var wordManagerService, batchLoaderService, words;

  beforeEach(module('words'));

  beforeEach(module(['$provide', function($provide) {
    words = [
        {
          'word': 'mock1',
          'category': 'mock1',
          'definition': ['mock1'],
          'inSentence': ['mock1'],
          'translation': {
            'ua': ['mock1'],
            'ru': ['mock1']
          }
        },
        {
          'word': 'mock2',
          'category': 'mock2',
          'definition': ['mock2'],
          'inSentence': ['mock2'],
          'translation': {
            'ua': ['mock2'],
            'ru': ['mock2']
          }
        }
      ];
      Object.defineProperty(words, '$promise', {
        'value': {'then': jasmine.createSpy('then').and.callThrough()}
      });

      $provide.value('batchLoader', {
        'load': jasmine.createSpy('load').and.returnValue(words)
      });
  }]));

  beforeEach(inject(['wordManager', 'batchLoader', function(wordManager, batchLoader) {
    wordManagerService = wordManager;
    batchLoaderService = batchLoader;
    wordManagerService.init();
  }]));

  it('init load words from batch loader service', function() {
    expect(batchLoaderService.load).toHaveBeenCalled();
  });

  it('get word return first word from dictionary', function() {
    expect(wordManagerService.getWord()).toEqual(words[0]);
  });

  it('has next word, when it is present in dictionary', function() {
    expect(wordManagerService.hasNext()).toBeTruthy();
  });

  it('next word remove processed one from dictionary', function() {
    expect(words.length).toBe(2);
    wordManagerService.nextWord();
    expect(words.length).toBe(1);
  });

  it('doesn\'t have next word, when it is absent', function() {
    wordManagerService.nextWord();
    expect(wordManagerService.hasNext()).toBeFalsy();
  });
});
