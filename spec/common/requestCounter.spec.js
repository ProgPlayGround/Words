'use strict';

describe('request counter service', function() {
  var requestCounterService, q;

  beforeEach(module('words'));

  beforeEach(inject(['requestCounter', '$q', function(requestCounter, $q) {
    requestCounterService = requestCounter;
    q = $q;
    spyOn(q,'when');
    spyOn(q,'reject');
  }]));

  it('request increase number of outstanding requests and wrap config', function() {
    expect(requestCounterService.requestCount()).toBe(0);

    var config = 'config';
    requestCounterService.request(config);

    expect(requestCounterService.requestCount()).toBe(1);
    expect(q.when).toHaveBeenCalledWith(config);
  });

  it('requestError decrease number of outstanding requests and reject with error', function() {
    expect(requestCounterService.requestCount()).toBe(0);

    var error = 'error';
    requestCounterService.requestError(error);

    expect(requestCounterService.requestCount()).toBe(-1);
    expect(q.reject).toHaveBeenCalledWith(error);
  });

  it('response decrease number of outstanding requests and wrap response', function() {
    expect(requestCounterService.requestCount()).toBe(0);

    var config = {};
    requestCounterService.request(config);

    expect(requestCounterService.requestCount()).toBe(1);
    expect(q.when).toHaveBeenCalledWith(config);
  });

  it('responseError decrease number of outstanding requests and reject with error', function() {
    expect(requestCounterService.requestCount()).toBe(0);

    var config = {};
    requestCounterService.request(config);

    expect(requestCounterService.requestCount()).toBe(1);
    expect(q.when).toHaveBeenCalledWith(config);
  });
});
