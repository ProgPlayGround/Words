(function() {
  'use strict';

  angular.module('words').constant('vkAppId', '5847929')
  .factory('vkAuthService', ['$window', '$cookies', '$log', 'userService','vkAppId', function($window, $cookies, $log, userService, vkAppId) {

    function onConnection(res, callback) {
      if(res.status == 'connected') {
        var name = res.session.user.nickname || res.session.user.first_name + ' ' + res.session.user.last_name;
        userService.set(name);
        var token = buildToken(res.session);
        $cookies.put('auth-type', 'vk');
        $cookies.put('token', token);
        callback();
      } else {
        $log.log(res);
        userService.clear();
        $cookies.remove('auth-type');
        $cookies.remove('token');
      }
    }

    function buildToken(session) {
      return 'expire=' + session.expire + 'mid=' + session.mid + 'secret=' + session.secret + 'sid=' + session.sid + '&' + session.sig;
    }

    return {
      init: function(callback) {
        $window.vkAsyncInit = function() {
          VK.init({
            apiId: vkAppId
          });

          VK.Observer.subscribe('auth.sessionChange', function(res) {
            callback(res, callback);
          });
        };

      },
      login: function(callback) {
        VK.Auth.login(function(res) {
          onConnection(res, callback);
        });
      },
      logout: function() {
        VK.Auth.logout(function() {
          userService.clear();
          $cookies.remove('auth-type');
          $cookies.remove('token');
        });
      }
    };
  }]);
})();
