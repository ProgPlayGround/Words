'use strict';

describe('Navbar controller', function() {
  var navbarCtrl, cookies;

  beforeEach(module('words'));

  beforeEach(inject(['$controller', '$cookies', function($controller, $cookies) {
      navbarCtrl = $controller('NavbarCtrl');
      cookies = $cookies;
  }]));

  it('use authService logout on basic auth type', inject(['authService', function(authService) {
    cookies.put('auth-type', 'basic');
    spyOn(authService, 'logout');

    navbarCtrl.logout();
    cookies.remove('auth-type');

    expect(authService.logout).toHaveBeenCalled();
  }]));

  it('use vkAuthService logout on vk auth type', inject(['vkAuthService', function(vkAuthService) {
    cookies.put('auth-type', 'vk');
    spyOn(vkAuthService, 'logout');

    navbarCtrl.logout();
    cookies.remove('auth-type');

    expect(vkAuthService.logout).toHaveBeenCalled();
  }]));

  it('use fbAuthService logout on fb auth type', inject(['fbAuthService', function(fbAuthService) {
    cookies.put('auth-type', 'fb');
    spyOn(fbAuthService, 'logout');

    navbarCtrl.logout();
    cookies.remove('auth-type');

    expect(fbAuthService.logout).toHaveBeenCalled();
  }]));

  it('do nothing on unknown auth type', inject(['authService', 'vkAuthService', 'fbAuthService', function(authService, vkAuthService, fbAuthService) {
    cookies.put('auth-type', 'unknown');
    spyOn(authService, 'logout');
    spyOn(vkAuthService, 'logout');
    spyOn(fbAuthService, 'logout');
    navbarCtrl.logout();
    cookies.remove('auth-type')
    ;
    expect(authService.logout).not.toHaveBeenCalled();
    expect(vkAuthService.logout).not.toHaveBeenCalled();
    expect(fbAuthService.logout).not.toHaveBeenCalled();
  }]));


});
