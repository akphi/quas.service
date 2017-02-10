"use strict";

let express = require("express");
let app = express();
let cluster = require("cluster");
let async = require("async");
let router = require("./api");
let database = require("./server/database/engine");
let logger = require("./server/setup/logger").server("APP");
let serverMessage = require("./server/constants/server.logger");
let config = require("./server/setup/config");

if (cluster.isMaster) {
  logger.info(serverMessage.CLUSTER_MASTER_INIT, process.pid);
  let workersNumber = config.get("NODE_CORE_WORKERS_SIZE") || require("os").cpus().length;
  for (let i = 0; i < workersNumber; ++i) {
    logger.info(serverMessage.CLUSTER_WORKER_INIT, cluster.fork().process.pid);
  }
  cluster.on("exit", () => {
    logger.info(serverMessage.CLUSTER_WORKER_INIT, cluster.fork().process.pid);
  });
} else {
  async.series([
    //Setup the app
    (callback) => {
      let helmet = require("helmet");
      app.use(helmet());
      app.disable("x-powered-by");
      app.use(express.static("public"));

      let bodyParser = require("body-parser");
      app.use(bodyParser.urlencoded({
        extended: true
      }));
      app.use(bodyParser.json());
      app.use(function (error, req, res, next) {
        if (error instanceof SyntaxError) {
          return res.status(400).json((config.get("SERVER_ENV") === "development" ? error : {}));
        }
        next();
      });
      app.listen(config.get("SERVER_PORT"));
      callback();
    }
  ].concat(
    // Setup the database
    Object.keys(database).map((engine) => {
      return (database[engine].roles).map((roleOptions) => {
        return (callback) => {
          database[engine].createConnectionPool(roleOptions, callback);
        }
      })
    }).reduce((a, b) => {
      return a.concat(b);
    }, [])),

    // Error Handler
    (error) => {
      if (error) {
        logger.error(serverMessage.INITIALIZATION_FAILURE, error);
        app.route("*").all((req, res) => {
          res.status(500).json((config.get("SERVER_ENV") === "development" ? error : {}));
        })
      } else {
        logger.info(serverMessage.INITIALIZATION_SUCCESS);
        app.use("/api", router);
        app.use("*", (req, res) => {
          res.status(404).json({});
        });
      }
    });
}

// Handle uncaught exception
process.on("uncaughtException", (error) => {
  logger.info(serverMessage.UNCAUGHT_EXCEPTION, { message: error.message, stack: error.stack });
  logger.info(serverMessage.CLUSTER_WORKER_TERMINATE, process.pid);
  process.exit(1);
})

module.exports = app;