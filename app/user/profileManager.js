(function() {
  angular.module('words').factory('profileManager', ['wordEndpoint', 'config', 'userService', function(wordEndpoint, config, userService) {
    var profileUrl = config.apiUrl + '/profile/' + userService.get();
    return {
      profile: function() {
        return wordEndpoint.load(profileUrl, false, function(data, headers) {
          var data = angular.fromJson(data);
          data.avatar = data.avatar + '?' + Date.now();
          return data;
        });
      },
      edit: function(profile) {
        return wordEndpoint.multpart(profileUrl, 'PUT', profile, function (data) {
              if(angular.isDefined(data)) {
                var fd = new FormData();
                fd.append('file', data.avatar);
                fd.append('name', data.name);
                fd.append('surname', data.surname);
                fd.append('birthday', data.birthday);
                return fd;
              }
              return data;
            });
      }
    }
  }]);
}());
