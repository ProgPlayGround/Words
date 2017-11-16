(function() {
  'use strict';
  angular.module('words').factory('categoryManager', ['$log', 'wordEndpoint', 'config',
  function($log, wordEndpoint, config) {

    var categoryUrl, categories;

    function find(name) {
      return _.find(categories, function(current) {
        return current.name === name;
      });
    }

    return {
      init: function(callback) {
        categoryUrl = config.apiUrl + '/category';
        categories = wordEndpoint.load(categoryUrl);
        categories.$promise.then(function(data) {
          data.forEach(function(elem) {
            elem.imageUrl = angular.isDefined(elem.imageUrl) && elem.imageUrl != null ? elem.imageUrl + '?' + Date.now() : '../images/default-img.png';
          });
          Array.prototype.unshift.call(data, {name: 'All Categories', imageUrl: '/images/all_categories.png'});
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
              res.category.imageUrl = angular.isDefined(res.category.imageUrl) && res.category.imageUrl != null ? res.category.imageUrl + '?' + Date.now() : '../images/default-img.png';
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
              categories[index].imageUrl = angular.isDefined(res.category.imageUrl) && res.category.imageUrl != null ? res.category.imageUrl + '?' + Date.now() : '../images/default-img.png';
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
