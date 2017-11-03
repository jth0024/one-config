/**
* @jest-environment node
*/
const constants = require('../../utils/constants');
const initialize = require('../../initialize');

describe('initialize on server', () => {
  it('should assign the config to global with an initial state', () => {
    initialize({});
    expect(global[constants.globalKey]).toEqual({
      [constants.stateKey]: {
        isFrozen: false,
      },
    });
  });
});
