'use strict';

describe('authentication service', function() {
  var authenticationService, httpBackend, cookies, userInfoService, url;

  beforeEach(module('words'));

  beforeEach(inject(['authService', '$httpBackend', '$cookies', 'userService', 'config', function(authService, $httpBackend, $cookies, userService, config) {
    authenticationService = authService;
    httpBackend = $httpBackend;
    cookies = $cookies;
    userInfoService = userService;
    url = config.apiUrl;
  }]));

  it('login on success populates cookies and user info', function() {
    httpBackend.expectPOST(url + '/authenticate/login')
    .respond(200, {success: 'true', token: '1'});

    authenticationService.login('username', 'password', function(response) {
      expect(userInfoService.get()).toEqual({username: 'username'});
      expect(cookies.get('auth-type')).toBe('basic');
      expect(cookies.get('token')).toBe(btoa(username + ':' + response.token));
    });

    expect(httpBackend.flush).not.toThrow();
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('registration on success populates cookies and user info', function() {
    httpBackend.expectPOST(url + '/authenticate/registration')
    .respond(200, {success: 'true', token: '1'});

    authenticationService.registration('username', 'password', function(response) {
      expect(userInfoService.get()).toEqual({username: 'username'});
      expect(cookies.get('auth-type')).toBe('basic');
      expect(cookies.get('token')).toBe(btoa(username + ':' + response.token));
    });

    expect(httpBackend.flush).not.toThrow();
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('logout remove auth related data', function() {

    authenticationService.logout();
    expect(userInfoService.get()).toEqual({});
    expect(cookies.get('auth-type')).not.toBeDefined();
    expect(cookies.get('token')).not.toBeDefined();
  });

 it('registration on failure doesn\'t populate cookies and user info', function() {
    httpBackend.expectPOST(url + '/authenticate/registration')
    .respond(200, {token: '1'});

    authenticationService.registration('username', 'password', function(response) {
      expect(userInfoService.get()).not.toBeDefined();
      expect(cookies.get('auth-type')).not.toBeDefined();
      expect(cookies.get('token')).not.toBeDefined();
    });

    expect(httpBackend.flush).not.toThrow();
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('logout on failure doesn\'t populate cookies and user info', function() {
     httpBackend.expectPOST(url + '/authenticate/login')
     .respond(200, {token: '1'});

     authenticationService.login('username', 'password', function(response) {
       expect(userInfoService.get()).not.toBeDefined();
       expect(cookies.get('auth-type')).not.toBeDefined();
       expect(cookies.get('token')).not.toBeDefined();
     });

     expect(httpBackend.flush).not.toThrow();
     httpBackend.verifyNoOutstandingExpectation();
     httpBackend.verifyNoOutstandingRequest();
   });

});
