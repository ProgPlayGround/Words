'use strict';

describe('user service', function() {
  var user;

  beforeEach(module('words'));

  beforeEach(inject(['userService', function(userService) {
    user = userService;
  }]));

  fit('set username for current user', function() {
    var username = 'username';
    user.set(username);
    expect(user.get().username).toBe(username);
  });

  fit('clear removes current user', function() {
    var username = 'username';
    user.set(username);
    user.clear();
    expect(user.get()).toEqual({});
  });
});
