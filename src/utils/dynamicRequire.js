/* eslint-disable no-eval, no-console */
module.exports = (nameOrPath = '') => {
  try {
    const escaped = nameOrPath.replace(/\\/g, '//');
    const requireStatement = `require("${escaped}")`;
    return eval(requireStatement);
  } catch (e) {
    return null;
  }
};
