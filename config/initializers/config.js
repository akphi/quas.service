'use strict';

var config = require('nconf');
require('dotenv').load();
config.use('memory')
    .argv()
    .env();

module.exports = config;