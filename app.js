'use strict';

let express = require('express');
let app = express();
let cluster = require('cluster');
let async = require('async');
let router = require('./api');
let database = require('./database/engine');
let logger = require('./setup/logger').server('APP');
let serverLoggerMessage = require('./constants/server.logger');
let config = require('./setup/config');

if (cluster.isMaster) {
  logger.info(serverLoggerMessage.CLUSTER_MASTER_INIT, process.pid);
  let workersNumber = config.get('NODE_CORE_WORKERS_SIZE') || require('os').cpus().length;
  for (let i = 0; i < workersNumber; ++i) {
    logger.info(serverLoggerMessage.CLUSTER_WORKER_INIT, cluster.fork().process.pid);
  }
  cluster.on('exit', () => {
    logger.info(serverLoggerMessage.CLUSTER_WORKER_INIT, cluster.fork().process.pid);
  });
} else {

  async.series([
    //Setup the app
    (callback) => {
      let helmet = require('helmet');
      app.use(helmet());
      app.disable('x-powered-by');
      app.use(express.static('public'));

      let bodyParser = require('body-parser');
      app.use(bodyParser.urlencoded({
        extended: true
      }));
      app.use(bodyParser.json());
      app.use(function (error, req, res, next) {
        if (error instanceof SyntaxError) {
          return res.status(400).json((config.get('SERVER_ENV') === 'development' ? error : {}));
        }
        next();
      });
      app.listen(config.get('SERVER_PORT'));
      callback();
    }
  ].concat(
    // Setup the database
    Object.keys(database).map((engine) => {
      return Object.keys(database[engine]).map((privilege) => {
        return (callback) => {
          database[engine][privilege].checkConnection(callback);
        }
      })
    }).reduce((a, b) => {
      return a.concat(b);
    }, [])),

    // Error Handler
    (error) => {
      if (error) {
        logger.error(serverLoggerMessage.INITIALIZATION_FAILURE, error);
        app.route('*').all((req, res) => {
          res.status(500).json((config.get('SERVER_ENV') === 'development' ? error : {}));
        })
      } else {
        logger.info(serverLoggerMessage.INITIALIZATION_SUCCESS);
        app.use('/api', router);
        app.use('*', (req, res) => {
          res.status(404).json({});
        });
      }
    });
}

// Handle uncaught exception
process.on('uncaughtException', (error) => {
  logger.info(serverLoggerMessage.UNCAUGHT_EXCEPTION, { message: error.message, stack: error.stack });
  logger.info(serverLoggerMessage.CLUSTER_WORKER_TERMINATE, process.pid);
  process.exit(1);
})

module.exports = app;
