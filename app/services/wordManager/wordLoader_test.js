'use strict';

describe('word loader service', function() {
  var wordLoaderService;

  beforeEach(module('words'));

  beforeEach(inject(['wordLoader', function(wordLoader) {
    wordLoaderService = wordLoader;
  }]));

  it('load return data in specific format', function() {
    var index = 0;
    expect(wordLoaderService.load()[index].word).toBeDefined();
    expect(wordLoaderService.load()[index].category).toBeDefined();
    expect(wordLoaderService.load()[index].definition).toBeDefined();
    expect(wordLoaderService.load()[index].inSentence).toBeDefined();
    expect(wordLoaderService.load()[index].translation).toBeDefined();
  });
});
