'use strict';

let config = require('./config');
let logger = require('./logger')('DATABASE');
let mongoose = require('mongoose');
let mongodbList = {
  local: 'mongodb://localhost/quas-db',
  remote: 'mongodb://test:test@ds033126.mlab.com:33126/quas-test'
}

module.exports = function (callback) {
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
      callback();
    })
    .on('error', (error) => {
      callback(new Error(error));
    });
}