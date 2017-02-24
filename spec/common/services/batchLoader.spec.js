'use strict';

describe('batch loader service', function() {
  var batchLoaderService, httpBackend;

  beforeEach(module('words'));

  beforeEach(inject(['batchLoader', '$httpBackend', function(batchLoader, $httpBackend) {
    batchLoaderService = batchLoader;
    httpBackend = $httpBackend;
  }]));

  it('load retrieve data from resource', function() {
    httpBackend.expectGET('https://localhost:3000/dictionary')
    .respond(200, [{word: 'firstMock'}, {word: 'secondMock'}]);

    batchLoaderService.load('https://localhost:3000/dictionary');

    expect(httpBackend.flush).not.toThrow();
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
});
