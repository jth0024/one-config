const forBrowser = require('./for-browser');
const constants = require('../utils/constants');

module.exports = () => {
  const browserConfig = JSON.stringify(forBrowser());

  return `
    if (!window[${constants.globalKey}]) {
      ${constants.globalKey} = ${browserConfig};
    }
  `;
};
