'use strict';

describe('word manager service', function() {
  var wordManagerService;

  beforeEach(module('words'));

  beforeEach(inject(['wordManager', function(wordManager) {
    wordManagerService = wordManager;
  }]));

  it('get word has specific format', function() {
    var index = 0;
    expect(wordManagerService.getWord).toBeDefined();
    expect(wordManagerService.getWord(index).word).toBeDefined();
    expect(wordManagerService.getWord(index).category).toBeDefined();
    expect(wordManagerService.getWord(index).translation).toBeDefined();
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
