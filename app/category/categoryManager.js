(function() {
  'use strict';
  angular.module('words').factory('categoryManager', ['wordEndpoint', 'userService', 'config', function(wordEndpoint, userService, config) {
    var categoryUrl = config.apiUrl + '/category';

    var userId = userService.get();
    var categories = wordEndpoint.load(categoryUrl + '/' + userId);

    return {
      get: function() {
        return categories;
      },
      add: function(category) {
        wordEndpoint.post(categoryUrl + '/' + user.id, category)
        .then(function(res) {
          categories.push(name);
        });
      },
      delete: function(category) {
        wordEndpoint.delete(categoryUrl + '/' + user.id + '/' + category.name)
        .then(function(res) {
          categories = categories.filter(function(elem) {
            return elem !== category.name;
          });
        });
      }
    };
  }]);
}());
