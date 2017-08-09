(function() {
  angular.module('words').factory('profileManager', ['wordEndpoint', 'config', 'userService', function(wordEndpoint, config, userService) {
    var profileUrl = config.apiUrl + '/profile'
    return {
      profile: function() {
        return wordEndpoint.load(profileUrl + '/' + userService.get(), false);
      }
    }
  }]);
}());
