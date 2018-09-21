const isObject = require('lodash/isObject');
const constants = require('./utils/constants');
const dynamicRequire = require('./utils/dynamicRequire');
const { getEnvironment, setHandlers, setInGlobal } = require('./utils/environment');

/* eslint-disable no-eval */
function initialize(source = constants.fileName, handlers = {}) {
  setHandlers(handlers);

  if (isObject(source)) {
    const config = initializeConfig(source);
    setInGlobal(constants.globalKey, config);
    return;
  }

  const { isBrowser } = getEnvironment();
  if (isBrowser) return;

  const contents = parseFile(source, {});
  const config = initializeConfig(contents);

  setInGlobal(constants.globalKey, config);
}

function initializeConfig(config = {}) {
  const initialState = {
    [constants.stateKey]: {
      isFrozen: false,
    },
  };

  if (!isObject(config)) return initialState;

  return {
    ...config,
    ...initialState,
  };
}

function parseFile(filePath, fallback) {
  const fs = dynamicRequire('fs');
  const path = dynamicRequire('path');

  if (!fs || !path) return fallback;

  const file = path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(file)) return fallback;

  return dynamicRequire(file) || fallback;
}

module.exports = initialize;
