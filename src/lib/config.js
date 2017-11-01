const has = require('lodash/has');
const constants = require('../utils/constants');

module.exports = () => {
  if (
    typeof global !== 'undefined' &&
    has(global, constants.globalKey)
  ) return global[constants.globalKey];

  if (
    typeof window !== 'undefined' &&
    has(window, constants.globalKey)
  ) return window[constants.globalKey];

  return {};
};
