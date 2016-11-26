'use strict';

describe('word loader service', function() {
  beforeEach(module('words'));

  it('get word has specific format', inject(['wordManager', function(wordManager) {
    expect(wordManager.getWords).toBeDefined();
    expect(wordManager.getWords().length).toBeDefined();
    _.each(wordManager.getWords(), function(item) {
      expect(item.word).toBeDefined();
      expect(item.category).toBeDefined();
      expect(item.translation).toBeDefined();
    });
  }]));
});
