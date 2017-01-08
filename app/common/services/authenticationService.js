(function() {
  'use strict';

  angular.module('words').factory('authService', ['$resource', '$cookies', 'userService', function($resource, $cookies, userService) {
    return {
      login: function(username, password, callback) {
        $resource('http://localhost:3000/authenticate/registration')
        .save({'username': username, 'password': password}).$promise
          .then(function(response) {
            if(response.success) {
              userService.set(username);
              $cookies.put('token', response.token);
            }

            callback(response);
          });
      },
      logout: function() {
        userService.clear();
        $cookies.remove('token');
      }
    };
  }]);
})();
