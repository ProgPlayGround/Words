(function() {
  'use strict';
  angular.module('words').factory('categoryManager', ['wordEndpoint', 'config', function(wordEndpoint, config) {
    var categoryUrl = config.apiUrl + '/category';

    var categories = wordEndpoint.load(categoryUrl);

    return {
      get: function() {
        return categories;
      },
      add: function(name) {
        wordEndpoint.post(categoryUrl, name)
        .then(function(res) {
          categories.push(name);
        });
      },
      rename: function(category, name) {
        wordEndpoint.patch(categoryUrl + '/' + category.name, name)
        .then(function(res) {
          categories.push(name);
        });
      },
      image: function(category, img) {
        wordEndpoint.uploadImg(categoryUrl + '/' + category.name, img)
        .then(function(res) {
          category.image = res.url + '?' + Date.now();
        });
      },
      delete: function(category) {
        wordEndpoint.delete(categoryUrl + '/' + category.name)
        .then(function(res) {
          categories = categories.filter(function(elem) {
            return elem !== category.name;
          });
        });
      }
    };
  }]);
}());
