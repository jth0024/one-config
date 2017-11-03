const has = require('./has');

module.exports = {
  getEnvironment,
  getInGlobal,
  setInGlobal,
};

function getEnvironment() {
  const isBrowser = typeof window !== 'undefined';
  const isServer = typeof window === 'undefined';

  return {
    isBrowser,
    isServer,
  };
}

function getInGlobal(key) {
  const { isBrowser, isServer } = getEnvironment();

  if (isBrowser && has(window, key)) return window[key];

  if (isServer && has(global, key)) return global[key];

  return undefined;
}

function setInGlobal(key, value) {
  const { isBrowser, isServer } = getEnvironment();

  if (isBrowser) window[key] = value;

  if (isServer) global[key] = value;
}
