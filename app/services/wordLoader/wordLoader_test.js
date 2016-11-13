'use strict';

describe('word loader service', function() {
  beforeEach(module('words'));

  it('get word is specific format', inject(['wordsLoaderService', function(wordsLoader) {    
    expect(wordsLoader.getWords).toBeDefined();
    expect(wordsLoader.getWords().word).toBeDefined();
    expect(wordsLoader.getWords().category).toBeDefined();
    expect(wordsLoader.getWords().translation).toBeDefined();
  }]));
});
