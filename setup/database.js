'use strict';

let config = require('./config');
let logger = require('./logger')('DATABASE');
let mongoose = require('mongoose');

module.exports = (callback) => {
  mongoose.Promise = global.Promise;
  mongoose.connect(config.get('DB_LOCATION'), {
    reconnectTries: Number.MAX_VALUE, // Unlimited amount of time within connection time-out
    reconnectInterval: Number(config.get('DB_RECONNECT_INTERVAL')),
    server: {
      socketOptions: {
        autoReconnect: true,
        keepAlive: Number(config.get('DB_KEEPALIVE')),
        connectTimeoutMS: Number(config.get('DB_TIMEOUT'))
      }
    },
    replset: {
      socketOptions: {
        autoReconnect: true,
        keepAlive: Number(config.get('DB_KEEPALIVE')),
        connectTimeoutMS: Number(config.get('DB_TIMEOUT'))
      }
    }
  });
  mongoose.connection
    .on('connected', () => {
      logger.info('Mongoose connection open to', config.get('DB_LOCATION'));
      callback();
    })
    .on('error', (error) => {
      logger.info('Mongoose connection error' , error);
      callback(new Error("DATABASE"));
    });
}