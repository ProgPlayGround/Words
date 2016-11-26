'use strict';

describe('word loader service', function() {
  beforeEach(module('words'));

  it('get word has specific format', inject(['wordLoader', function(wordLoader) {
    expect(wordLoader.getWords).toBeDefined();
    expect(wordLoader.getWords().length).toBeDefined();
    _.each(wordLoader.getWords(), function(item) {
      expect(item.word).toBeDefined();
      expect(item.category).toBeDefined();
      expect(item.translation).toBeDefined();
    });
  }]));
});
