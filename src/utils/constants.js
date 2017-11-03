const name = 'one-config';
const stateKey = `${name}/state`;

module.exports = {
  fileName: 'one.config.js',
  globalKey: name,
  internalKeys: [stateKey],
  serverKey: 'server',
  stateKey,
};
