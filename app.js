'use strict';

// CONFIG
// =============================================================================
var express = require('express');
var app = express();
var router = require('./api/controllers');
var async = require('async');
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('./api/helpers/logger')('APP');
var response = require('./api/helpers/response');
var config;

async.series([
  function setupConfig(callback) {
    config = require('./config/initializers/config');
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
    app.use('/api', router);
    callback();
  },
  function setupDocs(callback) {
    let SwaggerExpress = require('swagger-express-mw');
    let SwaggerUi = require('swagger-tools/middleware/swagger-ui');
    SwaggerExpress.create({
      appRoot: __dirname,
    }, function (err, swaggerExpress) {
      if (err) { throw err; }
      // Add swagger-ui (This must be before swaggerExpress.register)
      app.use(SwaggerUi(swaggerExpress.runner.swagger, { apiDocs: '/api/api-docs', swaggerUi: '/api/docs' }));
      // Install middleware
      swaggerExpress.register(app);
      logger.info('Initialize Swagger');
    });
    callback();
  },
  function initializeDBConnection(callback) {
    let mongoose = require('mongoose');
    let mongodbList = {
      local: 'mongodb://localhost/db',
      remote: 'mongodb://test:test@ds033126.mlab.com:33126/quas-test'
    }
    mongoose.Promise = global.Promise;
    mongoose.connect(mongodbList[config.get('DB_LOCATION')], {
      server: {
        socketOptions: {
          keepAlive: Number(config.get('DB_KEEPALIVE')),
          connectTimeoutMS: Number(config.get('DB_TIMEOUT'))
        }
      },
      replset: {
        socketOptions: {
          keepAlive: Number(config.get('DB_KEEPALIVE')),
          connectTimeoutMS: Number(config.get('DB_TIMEOUT'))
        }
      }
    });
    mongoose.connection
      .on('connected', () => {
        logger.info('Mongoose connection open to', mongodbList[config.get('DB_LOCATION')]);
      })
      .on('error', (error) => {
        logger.error('Mongoose connection error: ', error);
      });
    callback();
  },
  function startServer(callback) {
    app.listen(config.get('NODE_PORT'));
    callback();
  }], function (err) {
    if (err) {
      logger.error('Initialization failed', err);
    } else {
      logger.info('Initialized SUCCESSFULLY');
    }
  }
);

// SETUP TESTING
// =============================================================================
module.exports = app;
