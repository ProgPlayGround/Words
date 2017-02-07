'use strict';

describe('http auth headers service', function() {
  var authHeaders, cookies;

  beforeEach(module('words'));

  beforeEach(inject(['httpAuthHeaders', '$cookies', '$rootScope', function(httpAuthHeaders, $cookies) {
    authHeaders = httpAuthHeaders;
    cookies = $cookies;
  }]));

  it('header return empty headers when cookies is empty', function() {

    var headers = authHeaders.header();
    expect(headers['auth-type']).not.toBeDefined();
    expect(headers['auth-token']).not.toBeDefined();
  });

  it('header return authentication data', function() {
    cookies.put('auth-type', 'authType');
    cookies.put('token', 'token');

    var headers = authHeaders.header();
    expect(headers['auth-type']).toBe('authType');
    expect(headers['auth-token']).toBe('token');
  });

});
