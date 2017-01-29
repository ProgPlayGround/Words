(function() {
  'use strict';

  angular.module('words').factory('vkAuthService', ['$window', '$document', '$timeout', '$cookies', 'userService', '$log',
  function($window, $document, $timeout, $cookies, userService, $log) {

    function onConnection(res, callback) {
      if(res.status == 'connected') {
        var name = res.session.user.nickname || res.session.user.first_name + ' ' + res.session.user.last_name;
        userService.set(name);
        var token = 'expire=' + res.session.expire + 'mid=' + res.session.mid + 'secret=' + res.session.secret + 'sid=' + res.session.sid + '&' + res.session.sig;
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

    return {
      init: function(callback) {
        VK.Observer.subscribe('auth.sessionChange', function(res) {
          callback(res, callback);
        });
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
