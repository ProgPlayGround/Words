'use strict';

describe('word manager service', function() {
  var wordManager;

  beforeEach(module('words'));

  it('get word has specific format', inject(['wordManager', function(wordManager) {
    var index = 0;
    expect(wordManager.getWord).toBeDefined();
    expect(wordManager.getWord(index).word).toBeDefined();
    expect(wordManager.getWord(index).category).toBeDefined();
    expect(wordManager.getWord(index).translation).toBeDefined();
  }]));

  it('has item when index is less then data size', inject(['wordManager', function(wordManager) {
    var index = 0;
    expect(wordManager.has).toBeDefined();
    expect(wordManager.has(index)).toBeTruthy();
  }]));

  it('dont has item when index is out of bounce', inject(['wordManager', function(wordManager) {
    expect(wordManager.has).toBeDefined();
    expect(wordManager.has(-1)).toBeFalsy();
    expect(wordManager.has(11)).toBeFalsy();
  }]));
});
