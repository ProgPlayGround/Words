'use strict';

describe('Profile manager service', function() {
  var profileManagerService, httpBackend, url;

  beforeEach(function() {
    module('words');
    inject(['profileManager', '$httpBackend', 'config', function(profileManager, $httpBackend, config) {
      profileManagerService = profileManager;
      httpBackend = $httpBackend;
      url = config.apiUrl + '/profile';
    }]);
  });

  it('profile requests http resource for user data', function() {
    httpBackend.expectGET(url)
    .respond(200, {'profile': 'mockProfile'});

    profileManagerService.profile();

    expect(httpBackend.flush).not.toThrow();
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

});
