(function() {
  'use strict';

  angular.module('words').constant('fbAppId', '1225456694157240')
  .factory('fbAuthService', ['$window', '$cookies', '$log', 'userService', 'fbAppId', function($window, $cookies, $log, userService, fbAppId) {

    var clearUserData = function() {
      userService.clear();
      $cookies.remove('auth-type');
      $cookies.remove('token');
    };

    function onConnection(res, callback) {
      if(res.status === 'connected') {
        var accessToken = res.authResponse.accessToken;
        FB.api('/me', function(res) {
          userService.set(res.id);
          $cookies.put('auth-type', 'fb');
          $cookies.put('token', accessToken);
          callback();
        });
      } else {
        clearUserData();
      }
    }

    return {
      init: function(callback) {
        $window.fbAsyncInit = function() {
          FB.init({
            appId: fbAppId,
            status: true,
            cookie: true,
            xfbml: true,
            version: 'v2.8'
          });

          FB.Event.subscribe('auth.authResponseChange', function(res) {
            onConnection(res, callback);
          });
        };
      },
      login: function(callback) {
        FB.login(function(res) {
          onConnection(res, callback);
        });
      },
      logout: function() {
        FB.logout(function() {
          clearUserData();
        });
      }
    };
  }]);
}());
