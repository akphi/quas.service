'use strict';

let config = require('../../../config/initializers/config');
let logger = require('../helpers/logger')('MIDDLEWARE');
let RateLimit = require('express-rate-limit');
let RedisStore = require('rate-limit-redis');

// app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc) 

let limiter = new RateLimit({
  store: new RedisStore({
  }),
  windowMs: Number(config.get('RATE_TIME')),
  max: Number(config.get('RATE_LIMIT')),
  delayMs: 0 // disable delaying - full speed until the max limit is reached
});

module.exports = limiter;