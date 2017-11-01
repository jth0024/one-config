const isObject = require('lodash/isObject');
const constants = require('../utils/constants');

/* eslint-disable no-eval */
module.exports = () => {
  if (typeof window !== 'undefined') return;

  const fs = eval('require("fs")');
  const path = eval('require("path")');

  if (!fs || !path) return;

  const file = path.resolve(process.cwd(), constants.fileName);

  if (!fs.existsSync(file)) return;

  const contents = fs.readFileSync(file, 'utf8');
  const config = eval(contents);

  if (isObject(config)) {
    global[constants.globalKey] = config;
  } else {
    global[constants.globalKey] = {};
  }
};
