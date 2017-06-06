(function() {
  'use strict';
  angular.module('words').factory('categoryManager', ['wordEndpoint', 'config', function(wordEndpoint, config) {
    var categoryUrl = config.apiUrl + '/category';

    var categories = [{'name': 'first', 'img': 'images\\add.png'},
    {'name': 'secosecondsecondsecondsecondsecondsecondnd', 'img': 'images\\add.png'}];// wordEndpoint.load(categoryUrl);

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
