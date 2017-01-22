(function() {
  'use strict';

  angular.module('words').factory('fbAuthService', ['$cookies', 'userService', function($cookies, userService) {
    function onConnection(res, callback) {
      console.log(res.status);
      if(res.status == 'connected') {
        var accessToken = res.authResponse.accessToken;
        FB.api('/me', function(res) {
          userService.set(res);
          $cookies.put('auth-type', 'fb');
          $cookies.put('token', accessToken);
          callback();
        });
      } else {
        console.log(res.status);
        userService.clear();
        $cookies.remove('fb');
        $cookies.remove('token');
      }
    };
    return {
      onLoginStateChanged: function(callback) {
        FB.Event.subscribe('auth.authResponseChange', function(res) {
          onConnection(res, callback);
        });
      },
      login: function(callback) {
        FB.login(function(res) {
          onConnection(res, callback);
        });
      },
      logout: function() {
        FB.logout(function(res) {
          userService.clear();
          $cookies.remove('fb');
          $cookies.remove('token');
        });
      }
    };
  }]);
})();
