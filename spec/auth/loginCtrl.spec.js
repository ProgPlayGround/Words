'use strict';

describe('Login controller', function() {
  var loginController, response, state;

  beforeEach(function() {
    module('words');
    module(['$provide', function($provide) {

      $provide.factory('authService', function() {
        return {
          login: jasmine.createSpy('login').and.callFake(function() {
            var callback = arguments[2];
            callback(response);
          })
        };
      });
      $provide.factory('fbAuthService', function() {
        return {
          init: jasmine.createSpy('init').and.callThrough(),
          login: jasmine.createSpy('login').and.callFake(function() {
            var callback = arguments[0];
            callback();
          })
        };
      });
      $provide.factory('vkAuthService', function() {
        return {
          init: jasmine.createSpy('init').and.callThrough(),
          login: jasmine.createSpy('login').and.callFake(function() {
            var callback = arguments[0];
            callback();
          })
        };
      });
    }]);
  });

  beforeEach(inject(['$controller', '$state', function($controller, $state, $rootScope) {
    loginController = $controller('LoginCtrl');
    state = $state;
  }]));

  it('has empty email, password, errorClick', function() {
    expect(loginController.email).toBe('');
    expect(loginController.password).toBe('');
    expect(loginController.errorClick).toBeFalsy();
  });

  it('error click when email or password isn\'t set', function() {
    loginController.login();
    expect(loginController.errorClick).toBeTruthy();
  });

  it('navigate to main on login success response', function() {
    spyOn(state, 'go');
    loginController.email = 'email';
    loginController.password = 'password';
    response = {success:true};
    loginController.login();
    response = {};

    expect(state.go).toHaveBeenCalledWith('main');
  });

  it('error login message when response has status code 2', function() {
    loginController.email = 'email';
    loginController.password = 'password';
    response = {data: {errorCode: 2, message: 'message'}};
    loginController.login();
    response = {};

    expect(loginController.error.login).toEqual('message');
  });

  it('error password message when response has status code 3', function() {
    loginController.email = 'email';
    loginController.password = 'password';
    response = {data: {errorCode: 3, message: 'message'}};
    loginController.login();
    response = {};

    expect(loginController.error.password).toEqual('message');
  });

  it('navigate to main on fbLogin success response', function() {
    spyOn(state, 'go');
    loginController.fbLogin();

    expect(state.go).toHaveBeenCalledWith('main');
  });

  it('navigate to main on fbLogin success response', function() {
    spyOn(state, 'go');
    loginController.vkLogin();

    expect(state.go).toHaveBeenCalledWith('main');
  });

});
