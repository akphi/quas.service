'use strict';

let config = require('nconf');
let moment = require('moment');

require('dotenv').load();

let settings = {
  RATE_LIMIT_TIME: 60000,
  RATE_LIMIT_COUNT: 2000,

  LANGUAGE_DEFAULT: "en",

  CORS_DOMAINS: ['http://localhost:8080'],
  CORS_METHODS: ['GET', 'POST', 'PUT', 'DELETE'],
  //React frontend only allow lowercase custom headers
  //NodeJS also use lowercase: http://stackoverflow.com/questions/40700283/how-to-get-response-header-in-node-js
  CORS_HEADERS: ['authorization', 'content-type', 'x-language'],
  CORS_END_PREFLIGHT: true,

  DATE_FORMAT_STANDARD: moment.ISO_8601,
  DATE_FORMAT_DATABASE: "YYYY-MM-DD HH:MM:SS"
};

config.use('memory')
  .argv()
  .env()
  .defaults(settings);



module.exports = config;