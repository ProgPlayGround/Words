(function() {
  'use strict';

  angular.module('words').factory('vkAuthService', ['$window', '$cookies', 'userService', function($window, $cookies, userService) {

    function onConnection(res, callback) {
      if(res.status == 'connected') {
        console.log(res);
        var name = res.session.user.nickname || res.session.user.first_name + ' ' + res.session.user.last_name;
        userService.set(name);
        var token = 'expire=' + res.session.expire + 'mid=' + res.session.mid + 'secret=' + res.session.secret + 'sid=' + res.session.sid + '&' + res.session.sig;
        $cookies.put('auth-type', 'vk');
        $cookies.put('token', token);
        callback();
      } else {
        console.log(res);
        userService.clear();
        $cookies.remove('auth-type');
        $cookies.remove('token');
      }
    };

    return {
      init: function(callback) {
        $window.vkAsyncInit = function() {
          VK.init({
            apiId: '5847929'
          });

          VK.Observer.subscribe('auth.sessionChange', function(res) {
            onConnection(res, callback);
          });
        };

        setTimeout(function() {
          var el = document.createElement("script");
          el.type = "text/javascript";
          el.src = "https://vk.com/js/api/openapi.js?139";
          el.async = true;
          document.getElementById("vk_api_transport").appendChild(el);
        }, 0);
      },
      login: function(callback) {
        VK.Auth.login(function(res) {
          onConnection(res, callback);
        });
      },
      logout: function() {
        VK.Auth.logout(function(res) {
          userService.clear();
          $cookies.remove('auth-type');
          $cookies.remove('token');
        });
      }
    };
  }]);
})();
