'use strict';

let config = require('./config');
let mongoose = require('mongoose');
let logger = require('./logger').server('DATABASE');
let loggerMessage = require('../constants/logger');

module.exports = (callback) => {
  mongoose.Promise = global.Promise;
  mongoose.connect(config.get('DB_LOCATION'), {
    reconnectTries: Number.MAX_VALUE, // Unlimited amount of time within connection time-out
    reconnectInterval: Number(config.get('DB_RECONNECT_INTERVAL')),
    server: {
      poolSize: config.get('DB_POOL_SIZE'),
      socketOptions: {
        autoReconnect: true,
        keepAlive: Number(config.get('DB_KEEPALIVE')),
        connectTimeoutMS: Number(config.get('DB_TIMEOUT'))
      }
    },
    replset: {
      poolSize: config.get('DB_POOL_SIZE'),
      socketOptions: {
        autoReconnect: true,
        keepAlive: Number(config.get('DB_KEEPALIVE')),
        connectTimeoutMS: Number(config.get('DB_TIMEOUT'))
      }
    }
  });
  mongoose.connection
    .on('connected', () => {
      logger.info(loggerMessage.DATABASE_CONNECTION_SUCCESS, config.get('DB_LOCATION'));
      callback();
    })
    .on('error', (error) => {
      logger.info(loggerMessage.DATABASE_CONNECTION_FAILURE, error);
      callback();
    });
}