(function() {
  'use strict';

  angular.module('words').factory('authService', ['$resource', '$cookies', 'userService', function($resource, $cookies, userService) {
    return {
      login: function(username, password, callback) {
        $resource('https://localhost:3000/authenticate/login')
        .save({'username': username, 'password': password}).$promise
          .then(function(response) {
            if(response.success) {
              userService.set(username);
              $cookies.put('token', btoa(username + ':' + response.token));
            }

            callback(response);
          }).catch(callback);
      },
      registration: function(username, password, callback) {
        $resource('https://localhost:3000/authenticate/registration')
        .save({'username': username, 'password': password}).$promise
          .then(function(response) {
            if(response.success) {
              userService.set(username);
              $cookies.put('token', btoa(username + ':' + response.token));
            }

            callback(response);
          }).catch(callback);
      },
      logout: function() {
        userService.clear();
        $cookies.remove('token');
      }
    };
  }]);
})();
