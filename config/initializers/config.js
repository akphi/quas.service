'use strict';

let config = require('nconf');
require('dotenv').load();
config.use('memory')
  .argv()
  .env();

module.exports = config;