"use strict";

let config = require("../../../setup/config");
let mongodb = require("mongodb");
let logger = require("../../../setup/logger").server("DATABASE");
let serverMessage = require("../../../constants/server.logger");

let connections = {};

let createConnectionPool = (options, callback) => {
  mongodb.MongoClient.connect(
    "mongodb://" + options.username
    + ":" + options.password
    + "@" + options.host
    + ":" + options.port
    + "/" + options.database, {
      authSource: options.dbauthentication,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE, // Unlimited amount of time within connection time-out
      reconnectInterval: Number(config.get("DB_MONGO_RECONNECT_INTERVAL")),
      server: {
        poolSize: config.get("DB_MONGO_POOL_SIZE"),
        socketOptions: {
          keepAlive: Number(config.get("DB_MONGO_KEEPALIVE")),
          connectTimeoutMS: Number(config.get("DB_MONGO_TIMEOUT"))
        }
      },
      replset: {
        poolSize: config.get("DB_MONGO_POOL_SIZE"),
        socketOptions: {
          keepAlive: Number(config.get("DB_MONGO_KEEPALIVE")),
          connectTimeoutMS: Number(config.get("DB_MONGO_TIMEOUT"))
        }
      }
    }, (error, connection) => {
      if (error) {
        logger.info(serverMessage.DATABASE_CONNECTION_FAILURE, error);
        callback(error);
      } else {
        connections[options.name] = connection;
        logger.info(serverMessage.DATABASE_CONNECTION_SUCCESS, "(" + options.name + ") " + options.host + ":" + options.port + "/" + options.database);
        callback();
      }
    });
};

module.exports = {
  roles: require("./roles"),
  tool: require("./tools"),
  createConnectionPool: createConnectionPool,
  as: (roleName) => {
    return connections[roleName];
  }
};