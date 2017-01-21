'use strict';

let moment = require('moment');
let winston = require('winston');
let split = require('split');

let serverLogger = (label) => {
  winston.loggers.add(label, {
    file: {
      name: 'server-log',
      level: 'info',
      filename: './log/server.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: true,
      prettyPrint: true,
      timestamp: true,
      label: label,
    },
    console: {
      level: (process.env.NODE_ENV === 'development' ? 'debug' : 'info'),
      handleExceptions: true,
      json: false,
      prettyPrint: true,
      label: label,
      colorize: true,
      timestamp: () => {
        return moment().utc().format();
      },
      formatter: (options) => {
        return options.timestamp() + ' ' + winston.config.colorize(options.level, options.level.toUpperCase()) + ' [' + label + '] ' + (undefined !== options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
      }
    }
  });
  return winston.loggers.get(label);
};

let apiLogger = (label) => {
  winston.loggers.add(label, {
    file: {
      name: 'api-log',
      level: 'info',
      filename: './log/api.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: true,
      prettyPrint: true,
      timestamp: true,
      label: label,
    },
    console: {
      level: (process.env.NODE_ENV === 'development' ? 'debug' : 'info'),
      handleExceptions: true,
      json: false,
      prettyPrint: true,
      label: label,
      colorize: true,
      timestamp: () => {
        return moment().utc().format();
      },
      formatter: (options) => {
        return options.timestamp() + ' ' + winston.config.colorize(options.level, options.level.toUpperCase()) + ' [' + label + '] ' + (undefined !== options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
      }
    }
  });
  return winston.loggers.get(label);
};

let trafficTracker = new winston.Logger({
  transports: [
    new winston.transports.File({
      name: 'trafic-log',
      level: 'info',
      filename: './log/traffic.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: true,
      prettyPrint: true,
      timestamp: moment().utc().format(),
      label: 'TRAFFIC'
    }),
    new winston.transports.Console({
      level: (process.env.NODE_ENV === 'development' ? 'debug' : 'info'),
      handleExceptions: true,
      json: false,
      prettyPrint: true,
      colorize: true,
      timestamp: moment().utc().format(),
      label: 'TRAFFIC'
    })
  ],
  exitOnError: false
});

module.exports = {
  stream: split().on('data', (message) => {
    trafficTracker.info(message)
  }),
  server: serverLogger,
  api: apiLogger
}
