'use strict';

let config = require('../../../setup/config');
let corser = require('corser');

module.exports = corser.create({
  origins: config.get('CORS_DOMAINS'),
  requestHeaders: config.get('CORS_HEADERS'),
  methods: config.get('CORS_METHODS'),
  endPreflightRequests: config.get('CORS_END_PREFLIGHT')
});