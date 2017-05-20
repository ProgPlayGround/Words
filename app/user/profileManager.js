(function() {
  angular.module('words').factory('profileManager', ['$resource', 'config', 'httpAuthHeaders', function($resource, config, httpAuthHeaders) {
    var profileUrl = config.apiUrl + '/profile'
    return {
      profile: function() {
        return $resource(profileUrl, {}, {
          'get': {
            'method': 'GET',
            'headers': httpAuthHeaders.header()
          }
        }).get();
      }
    }
  }]);
}());
