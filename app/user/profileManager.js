(function() {
  angular.module('words').factory('profileManager', ['$resource', function($resource) {
    var profile = $resource('http://localhost:3000/profile');

    return {
      profile: function(id) {
        return profile.get();
      }
    }
  }]);
})();
