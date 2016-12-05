'use strict';

describe('word manager service', function() {
  var wordManagerService, wordLoaderService;

  beforeEach(function() {
    module('words');
    module(['$provide', function($provide) {
      $provide.value('wordLoader', {
        load: jasmine.createSpy('load').and.returnValue([{
              'word': 'mock',
              'category': 'mock',
              'definition': ['mock'],
              'inSentence': ['mock'],
              'translation': {
                'ua': ['mock'],
                'ru': ['mock']
              }
            }])
      });
    }])
  });

  beforeEach(inject(['wordManager', 'wordLoader', function(wordManager, wordLoader) {
    wordManagerService = wordManager;
    wordLoaderService = wordLoader;
  }]));

  it('load words on init', function() {
    expect(wordLoaderService.load).toHaveBeenCalled();
  });

  it('has item when index is less then data size', function() {
    var index = 0;
    expect(wordManagerService.has).toBeDefined();
    expect(wordManagerService.has(index)).toBeTruthy();
  });

  it('dont has item when index is out of bounce', function() {
    expect(wordManagerService.has).toBeDefined();
    expect(wordManagerService.has(-1)).toBeFalsy();
    expect(wordManagerService.has(11)).toBeFalsy();
  });
});
