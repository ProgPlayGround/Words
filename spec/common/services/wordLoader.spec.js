'use strict';

describe('word loader service', function() {
  var wordLoaderService, httpBackend;

  beforeEach(module('words'));

  beforeEach(inject(['wordLoader', '$httpBackend', function(wordLoader, $httpBackend) {
    wordLoaderService = wordLoader;
    httpBackend = $httpBackend;
  }]));

  it('allWords retrieve data from dictionary resource', function() {
    httpBackend.expectGET('http://localhost:3000/dictionary')
    .respond(200, [{word: 'firstMock'}, {word: 'secondMock'}]);

    wordLoaderService.allWords();

    expect(httpBackend.flush).not.toThrow();
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
});
