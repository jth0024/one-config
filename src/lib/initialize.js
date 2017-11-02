const isObject = require('lodash/isObject');
const constants = require('../utils/constants');
const dynamicRequire = require('../utils/dynamic-require');

/* eslint-disable no-eval */
module.exports = (filePath = constants.fileName) => {
  if (typeof window !== 'undefined') return;

  const fs = dynamicRequire('fs');
  const path = dynamicRequire('path');

  if (!fs || !path) return;

  const file = path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(file)) return;

  const contents = fs.readFileSync(file, 'utf8');
  const config = eval(contents);

  if (isObject(config)) {
    global[constants.globalKey] = config;
  } else {
    global[constants.globalKey] = {};
  }
};
