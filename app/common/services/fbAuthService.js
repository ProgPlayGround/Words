(function() {
  'use strict';

  angular.module('words').constant('fbAppId', '1225456694157240')
  .factory('fbAuthService', ['$window', '$cookies', '$log', 'userService', 'fbAppId', function($window, $cookies, $log, userService, fbAppId) {

    function onConnection(res, callback) {
      if(res.status == 'connected') {
        var accessToken = res.authResponse.accessToken;
        FB.api('/me', function(res) {
          userService.set(res);
          $cookies.put('auth-type', 'fb');
          $cookies.put('token', accessToken);
          callback();
        });
      } else {
        $log.log(res);
        userService.clear();
        $cookies.remove('auth-type');
        $cookies.remove('token');
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
          userService.clear();
          $cookies.remove('auth-type');
          $cookies.remove('token');
        });
      }
    };
  }]);
})();
