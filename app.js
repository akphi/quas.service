'use strict';

let express = require('express');
let app = express();
let router = require('./api');
let async = require('async');
let bodyParser = require('body-parser');
let logger = require('./setup/logger')('APP');
let config;

async.series([
  (callback) => {
    config = require('./setup/config');
    callback();
  },
  (callback) => {
    let helmet = require('helmet');
    app.use(helmet());
    app.disable('x-powered-by');
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
    callback();
  },
  (callback) => {
    app.listen(config.get('NODE_PORT'));
    callback();
  },
  (callback) => {
    require('./setup/database')(callback);
  },
], (err) => {
  if (err) {
    logger.error('Initialization FAILED', err);
    app.route('*').all((req, res) => {
      res.status(500).json({});
    })
  } else {
    logger.info('Initialization COMPLETED');
    app.use('/api', router);
    app.use('*', (req, res) => {
      res.status(404).json({});
    });
  }
});

module.exports = app;
