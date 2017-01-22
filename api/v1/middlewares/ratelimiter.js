'use strict';

let config = require('../../../setup/config');
let logger = require('../../../setup/logger').api('MIDDLEWARE', 'v1');
let RateLimit = require('express-rate-limit');
let RedisStore = require('rate-limit-redis');

// app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc) 

let limiter = new RateLimit({
  store: new RedisStore({
  }),
  windowMs: Number(config.get('RATE_LIMIT_TIME')),
  max: Number(config.get('RATE_LIMIT_COUNT')),
  delayMs: 0 // disable delaying - full speed until the max limit is reached
});

module.exports = limiter;