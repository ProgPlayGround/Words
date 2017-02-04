(function() {
  'use strict';

  angular.module('words').factory('fbAuthService', ['$window', '$cookies', 'userService', '$log', function($window, $cookies, userService, $log) {

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
            appId: '1225456694157240',
            status: true,
            cookie: true,
            xfbml: true,
            version: 'v2.8'
          });

          FB.Event.subscribe('auth.authResponseChange', function(res) {
            onConnection(res, callback);
          });
        };

        (function(d, s, id) {
           var js, fjs = d.getElementsByTagName(s)[0];
           if (d.getElementById(id)) {return;}
           js = d.createElement(s); js.id = id;
           js.src = "//connect.facebook.net/en_US/sdk.js";
           fjs.parentNode.insertBefore(js, fjs);
        } (document, 'script', 'facebook-jssdk'));
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
