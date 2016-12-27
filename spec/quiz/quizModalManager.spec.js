'use strict';

describe('Quiz modal manager', function() {
  var quizModalManagerService, uibModal;

  beforeEach(module('words'));

  beforeEach(inject(['quizModalManager', '$uibModal', function(quizModalManager, $uibModal) {
    quizModalManagerService = quizModalManager;
    uibModal = $uibModal;
    spyOn(uibModal, 'open');
  }]));

  it('finishModal open a modal', function() {
    quizModalManagerService.finishModal();
    expect(uibModal.open).toHaveBeenCalled();
  });
});
