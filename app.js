'use strict';

let express = require('express');
let app = express();
let router = require('./api');
let async = require('async');
let bodyParser = require('body-parser');
let logger = require('./setup/logger')('APP');
let config;

async.series([
  function setupConfig(callback) {
    config = require('./setup/config');
    callback();
  },
  function setupRouterAndMiddleware(callback) {
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
  function startServer(callback) {
    app.listen(config.get('NODE_PORT'));
    callback();
  },
  function initializeDBConnection(callback) {
    require('./setup/database')(callback);
  },
], function (err) {
  if (err) {
    logger.error('Initialization FAILED', err);
    app.route('*').all(function (req, res) {
      res.status(503);
      res.send('Server is currently unavailable or under maintenance.');
    })
    
  } else {
    logger.info('Initialization COMPLETED');
    app.use('/api', router);
  }
});

module.exports = app;
