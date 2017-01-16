(function() {
  angular.module('words').factory('profileManager', ['$resource', '$cookies', function($resource, $cookies) {

    return {
      profile: function() {
        return $resource('https://localhost:3000/profile', {}, {
          'get': {
            'method': 'GET',
            'headers': {
              'authorization': 'Basic ' + $cookies.get('token')
            }
          }
        }).get();
      }
    }
  }]);
})();
