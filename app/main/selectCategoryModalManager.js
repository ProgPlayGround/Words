(function() {
  'use strict';

    angular.module('words').factory('selectCategoryModalManager', ['$uibModal', function($uibModal) {
      return {
        open: function() {
          $uibModal.open({
            templateUrl: 'main/selectCategory.html',
            animation: false,
            size: 'sm',
            controller: 'SelectCategoryModalCtrl',
            controllerAs: 'cm',
            windowClass: 'category',
          });
        }
      };
    }]);
}());
