'use strict';

wordsApp.controller('SprintCtrl', ['$scope', 'wordsLoaderService', function($scope, wordsLoaderService) {
    $scope.data = wordsLoaderService.getWords();
}]);
