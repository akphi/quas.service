'use strict';

let express = require('express');
let app = express();
let router = require('./api');
let async = require('async');
let bodyParser = require('body-parser');
let logger = require('./setup/logger').server('APP');
let loggerMessage = require('./constants/logger');
let config;

async.series([
  (callback) => {
    config = require('./setup/config');
    let helmet = require('helmet');
    app.use(helmet());
    app.disable('x-powered-by');
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
    app.listen(config.get('NODE_PORT'));
    callback();
  },
  (callback) => {
    require('./setup/database')(callback);
  },
], (error) => {
  if (error) {
    logger.error(loggerMessage.INITIALIZATION_FAILURE, error);
    app.route('*').all((req, res) => {
      res.status(500).json({});
    })
  } else {
    logger.info(loggerMessage.INITIALIZATION_SUCCESS);
    app.use('/api', router);
    app.use('*', (req, res) => {
      res.status(404).json({});
    });
  }
});

module.exports = app;
