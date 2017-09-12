(function() {
  'use strict';

  angular.module('words').constant('fbAppId', '1225456694157240')
  .factory('fbAuthService', ['$window', '$cookies', 'config', 'userService', 'fbAppId', 'wordEndpoint',
   function($window, $cookies, config, userService, fbAppId, wordEndpoint) {

     var template = "0".repeat(24);

     function prepareUserId(id) {
       return (template + id).slice(-24);
     }

    var clearUserData = function() {
      userService.clear();
      $cookies.remove('auth-type');
      $cookies.remove('token');
    };

    function onConnection(res, callback) {
      if(res.status === 'connected') {
        var accessToken = res.authResponse.accessToken;
        $cookies.put('auth-type', 'fb');
        $cookies.put('token', accessToken);
        wordEndpoint.post(config.apiUrl + '/authenticate/fb/registration', {'userId': prepareUserId('fb' + res.authResponse.userID)}).$promise.then(function(data) {
          userService.set(data.userId);
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
