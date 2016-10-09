'use strict';

var config = require('../../config/initializers/config');
var logger = require('../helpers/logger')('MIDDLEWARE');
var RateLimit = require('express-rate-limit');
var RedisStore = require('rate-limit-redis');

// app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc) 

var limiter = new RateLimit({
  store: new RedisStore({
    // see Configuration 
  }),
  windowMs: 60 * 1000,
  max: 1000,
  delayMs: 0 // disable delaying - full speed until the max limit is reached
});

module.exports = limiter;