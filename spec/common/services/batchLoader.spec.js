'use strict';

describe('batch loader service', function() {
  var wordEndpointService, httpBackend;

  beforeEach(module('words'));

  beforeEach(inject(['wordEndpoint', '$httpBackend', function(wordEndpoint, $httpBackend) {
    wordEndpointService = wordEndpoint;
    httpBackend = $httpBackend;
  }]));

  it('load retrieve data from resource', function() {
    httpBackend.expectGET('https://localhost:3000/dictionary')
    .respond(200, [{word: 'firstMock'}, {word: 'secondMock'}]);

    wordEndpointService.load('https://localhost:3000/dictionary');

    expect(httpBackend.flush).not.toThrow();
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
});
