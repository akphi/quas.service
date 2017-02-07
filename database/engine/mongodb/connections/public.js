'use strict';

let config = require('../../../../setup/config');
let mongodb = require('mongodb');
let logger = require('../../../../setup/logger').server('DATABASE');
let serverLoggerMessage = require('../../../../constants/server.logger');

let databaseConnection;

let connection = () => {
  return databaseConnection;
}

let checkConnection = (callback) => {
  mongodb.MongoClient.connect(
    "mongodb://" + config.get('DB_MONGO_PUBLIC_USERNAME')
    + ":" + config.get('DB_MONGO_PUBLIC_PASSWORD')
    + "@" + config.get('DB_MONGO_HOST')
    + ":" + config.get('DB_MONGO_PORT')
    + "/" + config.get('DB_MONGO_DBNAME'), {
      authSource: config.get('DB_MONGO_DBAUTHENTICATION'),
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE, // Unlimited amount of time within connection time-out
      reconnectInterval: Number(config.get('DB_MONGO_RECONNECT_INTERVAL')),
      server: {
        poolSize: config.get('DB_MONGO_POOL_SIZE'),
        socketOptions: {
          keepAlive: Number(config.get('DB_MONGO_KEEPALIVE')),
          connectTimeoutMS: Number(config.get('DB_MONGO_TIMEOUT'))
        }
      },
      replset: {
        poolSize: config.get('DB_MONGO_POOL_SIZE'),
        socketOptions: {
          keepAlive: Number(config.get('DB_MONGO_KEEPALIVE')),
          connectTimeoutMS: Number(config.get('DB_MONGO_TIMEOUT'))
        }
      }
    }, (error, database) => {
      if (error) {
        logger.info(serverLoggerMessage.DATABASE_CONNECTION_FAILURE, error);
        callback(error);
      } else {
        databaseConnection = database;
        logger.info(serverLoggerMessage.DATABASE_CONNECTION_SUCCESS, config.get('DB_MONGO_HOST') + ":" + config.get('DB_MONGO_PORT') + "/" + config.get('DB_MONGO_DBNAME'));
        callback();
      }
    });
};

module.exports = { connection, checkConnection };

