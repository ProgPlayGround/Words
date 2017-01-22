(function() {
  angular.module('words').factory('profileManager', ['$resource', 'httpAuthHeaders', function($resource, httpAuthHeaders) {

    return {
      profile: function() {
        return $resource('https://localhost:3000/profile', {}, {
          'get': {
            'method': 'GET',
            'headers': httpAuthHeaders.header()
          }
        }).get();
      }
    }
  }]);
})();
