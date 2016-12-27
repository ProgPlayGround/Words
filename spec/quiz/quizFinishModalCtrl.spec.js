'use strict';

describe('QuizFinishModalCtrl', function() {
  var controller, state, uibModalInstance, scoreManagerService, nextState;

  beforeEach(function() {
    module('words');
    module(['$provide', function($provide) {
      $provide.value('modalInstance', jasmine.createSpyObj('modalInstance', ['close']));
    }]);
  });

  beforeEach(inject(['$controller', '$state', 'modalInstance', 'scoreManager',
  function($controller, $state, modalInstance, scoreManager) {
    state = $state;
    uibModalInstance = modalInstance;
    scoreManagerService = scoreManager;
    nextState = 'next';

    spyOn(scoreManager, 'get').and.returnValue(35);

    controller = $controller('QuizFinishModalCtrl', {
      '$state': $state,
      '$uibModalInstance': modalInstance,
      'scoreManager': scoreManager,
      'nextState': nextState
    });
  }]));

  it('score is populated from scoreManager', function() {
    expect(controller.score).toBe(35);
  });

  fit('close navigate to state and dismiss dialog', function() {
    spyOn(state, 'go');
    controller.close();
    expect(state.go).toHaveBeenCalledWith(nextState);
    expect(uibModalInstance.close).toHaveBeenCalled();
  });
});
