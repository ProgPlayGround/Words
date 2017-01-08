(function() {
  angular.module('words').factory('profileManager', ['$resource', '$cookies', function($resource, $cookies) {
    var profile = $resource('http://localhost:3000/profile', {}, {
      'get': {
        'method': 'GET',
        'headers': {
          'x-access-token': $cookies.get('token')
        }
      }
    });

    return {
      profile: function() {
        return profile.get();
      }
    }
  }]);
})();
