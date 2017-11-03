const config = require('./config');
const get = require('lodash/get');

module.exports = (path) => get(config(), path);
