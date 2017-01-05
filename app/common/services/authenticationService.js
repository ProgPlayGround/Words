(function() {
  'use strict';

  angular.module('words').factory('authService', ['$http', '$cookies', 'userService', function($http, $cookies, userService) {
    return {
      login: function(username, password, callback) {
        $http.post('https://localhost:3000/authenticate', {'username': username, 'password': password})
          .then(function(response) {

            if(response.success) {
              userService.set(email, response.token);
              $http.defaults.headers.common['Authorization'] = 'Basic ' + response.token;
              $cookies.putObject('user', userService.get(), {expires: response.expires});
            }

            callback(response);
          });
      },
      clear: function() {
        userService.clear();
        $http.defaults.headers.common['Authorization'] = 'Basic';
        $cookies.remove('user');
      }
    };
  }]);
})();
