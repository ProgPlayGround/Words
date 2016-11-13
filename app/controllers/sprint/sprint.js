'use strict';

angular.module('words').controller('SprintCtrl', ['$scope', 'wordsLoaderService', function($scope, wordsLoader) {
    $scope.data = wordsLoader.getWords();
}]);
