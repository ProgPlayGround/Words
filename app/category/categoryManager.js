(function() {
  'use strict';
  angular.module('words').factory('categoryManager', ['wordEndpoint', 'userService', 'config', function(wordEndpoint, userService, config) {
    var categoryUrl = config.apiUrl + '/category';

    var userId, categories;

    function find(name) {
      return _.find(categories, function(current) {
        return current.name === name;
      });
    }

    return {
      init: function(callback) {
        userId = userService.get();
        categories = wordEndpoint.load(categoryUrl + '/' + userId);

        callback(categories);
      },
      get: function() {
        return categories;
      },
      add: function(category, img) {
        wordEndpoint.post(categoryUrl + '/' + userId, {
          'category': category
        }).$promise.then(function(res) {
          categories.push({'name': category, 'imageUrl': 'images/add.png'});
        });
      },
      delete: function(category) {
        wordEndpoint.delete(categoryUrl + '/' + userId + '/' + category.name)
        .then(function(res) {
          categories = categories.filter(function(elem) {
            return elem !== category.name;
          });
        });
      }
    };
  }]);
}());
