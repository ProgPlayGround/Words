'use strict';

describe('word loader service', function() {
  beforeEach(module('words'));

  it('get word has specific format', inject(['wordLoader', function(wordLoader) {
    expect(wordLoader.getWords).toBeDefined();
    expect(wordLoader.getWords().word).toBeDefined();
    expect(wordLoader.getWords().category).toBeDefined();
    expect(wordLoader.getWords().translation).toBeDefined();
  }]));
});
