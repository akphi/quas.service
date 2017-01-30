'use strict';

let express = require('express');
let app = express();
let cluster = require('cluster');
let async = require('async');
let router = require('./api');
let logger = require('./setup/logger').server('APP');
let loggerMessage = require('./constants/logger');
let config = require('./setup/config');

if (cluster.isMaster) {
  let workersNumber = config.get('NODE_CORE_WORKERS_SIZE') || require('os').cpus().length;
  for (let i = 0; i < workersNumber; ++i) {
    logger.info(loggerMessage.CLUSTER_WORKER_INIT, cluster.fork().process.pid);
  }
  cluster.on('exit', () => {
    logger.info(loggerMessage.CLUSTER_WORKER_INIT, cluster.fork().process.pid);
  });
} else {
  // Setup the app
  async.series([
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
    },
    (callback) => {
      require('./setup/database')(callback);
    },
  ], (error) => {
    if (error) {
      logger.error(loggerMessage.INITIALIZATION_FAILURE, error);
      app.route('*').all((req, res) => {
        res.status(500).json((config.get('SERVER_ENV') === 'development' ? error : {}));
      })
    } else {
      logger.info(loggerMessage.INITIALIZATION_SUCCESS);
      app.use('/api', router);
      app.use('*', (req, res) => {
        res.status(404).json({});
      });
    }
  });
}

// Handle uncaught exception
process.on('uncaughtException', (error) => {
  logger.info(loggerMessage.UNCAUGHT_EXCEPTION, { message: error.message, stack: error.stack });
  logger.info(loggerMessage.CLUSTER_WORKER_TERMINATE, process.pid);
  process.exit(1);
})

module.exports = app;
