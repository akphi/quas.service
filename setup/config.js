'use strict';

let config = require('nconf');
require('dotenv').load();

console.log(process.env.NODE_HOST);
let settings = {
  RATE_LIMIT_TIME: 60000,
  RATE_LIMIT_COUNT: 2000,

  LANGUAGE_DEFAULT: "en",

  CORS_DOMAINS: [process.env.NODE_HOST],
  CORS_METHODS: ['GET', 'POST', 'PUT', 'DELETE'],
  CORS_HEADERS: ['AUTHORIZATION', 'CONTENT-TYPE', 'X-LANGUAGE'],
  CORS_END_PREFLIGHT: true,
};

config.use('memory')
  .argv()
  .env()
  .defaults(settings);



module.exports = config;