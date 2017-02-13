'use strict';

var FB;

describe('Facebook auth service', function() {
  var fbAuth, response, cookies, userInfoService, user = 'User';

   FB = {
    login: jasmine.createSpy('login').and.callFake(function() {
      var callback = arguments[0];
      callback(response);
    }),
    logout: jasmine.createSpy('logout').and.callFake(function() {
      var callback = arguments[0];
      callback();
    }),
    api: jasmine.createSpy('api').and.callFake(function() {
      var callback = arguments[1];
      callback(user);
    }),
    init: jasmine.createSpy('init').and.callThrough(),
    Event: {
      subscribe: jasmine.createSpy('subscribe').and.callThrough()
    }
  };

  beforeEach(module('words'));

  beforeEach(inject(['fbAuthService', '$cookies', 'userService',
   function(fbAuthService, $cookies, userService) {
    fbAuth = fbAuthService;
    cookies = $cookies;
    userInfoService = userService;
  }]));

  it('login successfully populates auth and user info', function() {
    var callback = jasmine.createSpy('callback');
    response = {status: 'connected', authResponse: {accessToken: 'token'}};
    fbAuth.login(callback);
    response = {};
    expect(callback).toHaveBeenCalled();
    expect(userInfoService.get()).toEqual({'username' : 'User'});
    expect(cookies.get('auth-type')).toBe('fb');
    expect(cookies.get('token')).toBe('token');
  });

  it('login not successfully clear user data', function() {
    var callback = jasmine.createSpy('callback');
    response = {status: 'not connected'};
    fbAuth.login(callback);
    response = {};
    expect(callback).not.toHaveBeenCalled()
    expect(userInfoService.get()).toEqual({});
    expect(cookies.get('auth-type')).not.toBeDefined();
    expect(cookies.get('token')).not.toBeDefined();
  });

  it('logout clear user data', function() {
    fbAuth.logout();
    expect(userInfoService.get()).toEqual({});
    expect(cookies.get('auth-type')).not.toBeDefined();
    expect(cookies.get('token')).not.toBeDefined();
  });

});
