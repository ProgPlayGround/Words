'use strict';

describe('Profile manager service', function() {
  var profileManagerService, httpBackend;

  beforeEach(module('words'));

  beforeEach(inject(['profileManager', '$httpBackend', function(profileManager, $httpBackend) {
    profileManagerService = profileManager;
    httpBackend = $httpBackend;
  }]));

  it('profile requests http resource for user data', function() {
    httpBackend.expectGET('https://localhost:3000/profile')
    .respond(200, {'profile': 'mockProfile'});

    profileManagerService.profile();

    expect(httpBackend.flush).not.toThrow();
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

});
