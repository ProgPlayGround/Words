'use strict';

var VK;

describe('Facebook auth service', function() {
  var vkAuth, response, cookies, userInfoService;

   VK = {
    Auth: {
     login: jasmine.createSpy('login').and.callFake(function() {
       var callback = arguments[0];
       callback(response);
     }),
     logout: jasmine.createSpy('logout').and.callFake(function() {
       var callback = arguments[0];
       callback();
     }),

    },
    init: jasmine.createSpy('init').and.callThrough(),
    Observer: {
      subscribe: jasmine.createSpy('subscribe').and.callThrough()
    }
  };

  beforeEach(module('words'));

  beforeEach(inject(['vkAuthService', '$cookies', 'userService',
   function(vkAuthService, $cookies, userService) {
    vkAuth = vkAuthService;
    cookies = $cookies;
    userInfoService = userService;
  }]));

  it('login successfully populates auth and user info when nickname specified', function() {
    var callback = jasmine.createSpy('callback');
    response = {
      status: 'connected',
      session: {
        user: {nickname: 'Ving', first_name: 'first', last_name: 'last'
      },
      expire: 'expire', mid: 'mid', secret: 'secret', sid: 'sid', sig: 'sig'}
    };
    vkAuth.login(callback);
    response = {};
    expect(callback).toHaveBeenCalled();
    expect(userInfoService.get()).toEqual({'username' : 'Ving'});
    expect(cookies.get('auth-type')).toBe('vk');
    expect(cookies.get('token')).toBe('expire=expiremid=midsecret=secretsid=sid&sig');
  });

  it('login successfully populates auth and user info without nickname', function() {
    var callback = jasmine.createSpy('callback');
    response = {
      status: 'connected',
      session: {
        user: {first_name: 'first', last_name: 'last'
      },
      expire: 'expire', mid: 'mid', secret: 'secret', sid: 'sid', sig: 'sig'}
    };
    vkAuth.login(callback);
    response = {};
    expect(callback).toHaveBeenCalled();
    expect(userInfoService.get()).toEqual({'username' : 'first last'});
    expect(cookies.get('auth-type')).toBe('vk');
    expect(cookies.get('token')).toBe('expire=expiremid=midsecret=secretsid=sid&sig');
  });

  it('login not successfully clear user data', function() {
    var callback = jasmine.createSpy('callback');
    response = {status: 'not connected'};
    vkAuth.login(callback);
    response = {};
    expect(callback).not.toHaveBeenCalled()
    expect(userInfoService.get()).toEqual({});
    expect(cookies.get('auth-type')).not.toBeDefined();
    expect(cookies.get('token')).not.toBeDefined();
  });

  it('logout clear user data', function() {
    vkAuth.logout();
    expect(userInfoService.get()).toEqual({});
    expect(cookies.get('auth-type')).not.toBeDefined();
    expect(cookies.get('token')).not.toBeDefined();
  });

});
