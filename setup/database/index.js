'use strict';

let config = require('../config');
let mongoose = require('mongoose');
let logger = require('../logger').server('DATABASE');
let loggerMessage = require('../../constants/logger');

module.exports = (callback) => {
  mongoose.Promise = global.Promise;
  mongoose.connect("mongodb://" + config.get('DB_MONGO_HOST') + ":" + config.get('DB_MONGO_PORT') + "/" + config.get('DB_MONGO_DBNAME'), {
    auth: {
      authdb: config.get('DB_MONGO_DBAUTHENTICATION')
    },
    user: config.get('DB_MONGO_USERNAME'),
    pass: config.get('DB_MONGO_PASSWORD'),
    reconnectTries: Number.MAX_VALUE, // Unlimited amount of time within connection time-out
    reconnectInterval: Number(config.get('DB_MONGO_RECONNECT_INTERVAL')),
    server: {
      poolSize: config.get('DB_MONGO_POOL_SIZE'),
      socketOptions: {
        autoReconnect: true,
        keepAlive: Number(config.get('DB_MONGO_KEEPALIVE')),
        connectTimeoutMS: Number(config.get('DB_MONGO_TIMEOUT'))
      }
    },
    replset: {
      poolSize: config.get('DB_MONGO_POOL_SIZE'),
      socketOptions: {
        autoReconnect: true,
        keepAlive: Number(config.get('DB_MONGO_KEEPALIVE')),
        connectTimeoutMS: Number(config.get('DB_MONGO_TIMEOUT'))
      }
    }
  });
  mongoose.connection
    .on('connected', () => {
      logger.info(loggerMessage.DATABASE_CONNECTION_SUCCESS, config.get('DB_MONGO_LOCATION'));
      callback();
    })
    .on('error', (error) => {
      logger.info(loggerMessage.DATABASE_CONNECTION_FAILURE, error);
      callback();
    });
}