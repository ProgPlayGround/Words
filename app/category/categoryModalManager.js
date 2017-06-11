(function() {
  'use strict';

    angular.module('words').factory('categoryModalManager', ['$uibModal', function($uibModal) {
      return {
        addCategory: function() {
          $uibModal.open({
            templateUrl: 'category/addCategory.html',
            animation: false,
            size: 'sm',
            controller: 'CategoryModalCtrl',
            controllerAs: 'cm',
            windowClass: 'add_category'
          });
        }
      };
    }]);
}());
