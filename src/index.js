const config = require('./lib/config');
const forBrowser = require('./lib/for-browser');
const getScript = require('./lib/get-script');
const initialize = require('./lib/initialize');

module.exports = {
  config: config(),
  forBrowser,
  getScript,
  initialize,
};
