/* eslint-disable no-eval, no-console */
module.exports = (name = '') => {
  try {
    const normalizedName = name.replace(/\\/g, '//');
    const result = eval(`require("${normalizedName}")`);
    return result;
  } catch (e) {
    return null;
  }
};
