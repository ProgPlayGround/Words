(function() {
  'use strict';
  angular.module('words').factory('categoryManager', ['$log', 'wordEndpoint', 'userService', 'config', function($log, wordEndpoint, userService, config) {

    var categoryUrl, categories;

    function find(name) {
      return _.find(categories, function(current) {
        return current.name === name;
      });
    }

    return {
      init: function(callback) {
        categoryUrl = config.apiUrl + '/category/' + userService.get();
        categories = wordEndpoint.load(categoryUrl);
        categories.$promise.then(function(data) {
          Array.prototype.unshift.call(data, {name: 'All Categories'});
          callback(data);
        });
      },
      get: function() {
        return categories;
      },
      add: function(category, img, callback) {
        var existingCategory = categories.find(function(elem) {
          return elem.name === category;
        });

        if(existingCategory) {
          callback({'status': 409});
        } else {
          wordEndpoint.uploadImg(categoryUrl + '/' + category, img)
          .$promise.then(function(res) {
            if(res.success) {
              categories.push(res.category);
            } else {
              $log.error('Error occured %s', res.err);
            }
            callback(res);
          }).catch(function(res) {
            $log.error('Error occured %s', res.data.err);
            callback(res);
          });
        }
      },
      edit: function(prevCategory, category, img, callback) {
        var index = categories.findIndex(function(elem) {
          return elem.name === prevCategory;
        });
        if(index !== -1) {
          wordEndpoint.replaceImg(categoryUrl + '/' + prevCategory + '/' + category, img)
          .$promise.then(function(res) {
            if(res.success) {
              categories[index].name = res.category.name;
              categories[index].imageUrl = res.category.imageUrl + '?' + Date.now();
            } else {
              $log.error('Error occured %s', res.err);
            }
            callback(res);
          }).catch(function(res) {
            $log.error('Error occured %s', res.data.err);
            callback(res);
          });
        }
      },
      delete: function(category) {
        var index = categories.indexOf(category);
        if(index !== -1) {

          wordEndpoint.delete(categoryUrl + '/' + category.name)
          .$promise.then(function(res) {
            if(res.success) {
              categories.splice(index, 1);
            } else {
              $log.error('Error on server side %s', res.err);
            }
          });
        }
      }
    };
  }]);
}());
