'use strict';

describe('Registration controller', function() {
  var registrationController, response, state;

  beforeEach(function() {
    module('words');
    module(['$provide', function($provide) {

      $provide.factory('authService', function() {
        return {
          registration: jasmine.createSpy('login').and.callFake(function() {
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

    inject(['$controller', '$state', function($controller, $state, $rootScope) {
      registrationController = $controller('RegistrationCtrl');
      state = $state;
    }]);
  });

  it('has empty email, password, errorClick', function() {
    expect(registrationController.email).toBe('');
    expect(registrationController.password).toBe('');
    expect(registrationController.errorClick).toBeFalsy();
  });

  it('error click when email or password isn\'t set', function() {
    registrationController.registration();
    expect(registrationController.errorClick).toBeTruthy();
  });

  it('navigate to main on login success response', function() {
    spyOn(state, 'go');
    registrationController.email = 'email';
    registrationController.password = 'password';
    response = {success:true};
    registrationController.registration();
    response = {};

    expect(state.go).toHaveBeenCalledWith('main');
  });

  it('error login message when response has status code 2', function() {
    registrationController.email = 'email';
    registrationController.password = 'password';
    response = {data: {errorCode: 1, message: 'message'}};
    registrationController.registration();
    response = {};

    expect(registrationController.error).toEqual('message');
  });

  it('navigate to main on fbLogin success response', function() {
    spyOn(state, 'go');
    registrationController.fbLogin();

    expect(state.go).toHaveBeenCalledWith('main');
  });

  it('navigate to main on fbLogin success response', function() {
    spyOn(state, 'go');
    registrationController.vkLogin();

    expect(state.go).toHaveBeenCalledWith('main');
  });

});
