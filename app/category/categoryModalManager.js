(function() {
  'use strict';

    angular.module('words').factory('categoryModalManager', ['$uibModal', function($uibModal) {
      var categoryMetadata = {
        templateUrl: 'category/categoryModal.html',
        animation: false,
        size: 'sm',
        controller: 'CategoryModalCtrl',
        controllerAs: 'cm',
        windowClass: 'category',
      };
      return {
        add: function() {
          var addMetadata = Object.assign(categoryMetadata, {
            resolve: {
              categoryMode: function() {
                return 'add';
              },
              selectedCategory: function() {
                return null;
              }
            }
          });
          $uibModal.open(addMetadata);
        },
        edit: function(category) {
          var updateMetadata = Object.assign(categoryMetadata, {
            resolve: {
              categoryMode: function() {
                return 'edit';
              },
              selectedCategory: function() {
                return category;
              }
            }
          });
          $uibModal.open(updateMetadata);
        },
        choose: function() {
          $uibModal.open(categoryMetadata);
        }
      };
    }]);
}());
