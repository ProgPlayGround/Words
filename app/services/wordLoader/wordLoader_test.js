'use strict';

describe('word loader service', function() {

  beforeEach(module('words'));

  it('define load method', inject(['wordsLoaderService', function(wordsLoader) {
    expect(wordsLoader).toBeDefined();
    expect(wordsLoader.getWords).toBeDefined();
  }]));
});
