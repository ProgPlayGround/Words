(function() {
  angular.module('words').factory('ProfileManager', ['$resource', function($resource) {
    var profile = $resource('http://localhost:3000/profile');

    return {
      profile: function(id) {
        return profile.get();
      }
    }
  }]);
})();
