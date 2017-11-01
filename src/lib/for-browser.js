const omit = require('lodash/omit');
const constants = require('../utils/constants');
const config = require('./config');


module.exports = () => omit(config(), constants.serverKey);
