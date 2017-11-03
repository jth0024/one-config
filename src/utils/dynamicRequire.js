/* eslint-disable no-eval, no-console */
module.exports = (name = '') => {
  try {
    const result = eval(`require("${name}")`);
    return result;
  } catch (e) {
    return null;
  }
};
