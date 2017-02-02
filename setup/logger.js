'use strict';

require('winston-daily-rotate-file');
let moment = require('moment');
let winston = require('winston');
let split = require('split');
let config = require('./config');
let mkdirp = require('mkdirp');
let loggerMessage = require('../constants/logger');

let directories = {
  server: './log/server/',
  api: './log/api/',
  traffic: './log/traffic/',
  exception: './log/exception/'
}

let fileTransport = (name, level, label, dirname, filename, dailyRotateOptions, maxsize = config.get('LOGGER_MAX_SIZE'), maxFiles = config.get('LOGGER_MAX_FILES')) => {
  return new winston.transports.DailyRotateFile({
    name: name,
    level: level,
    label: label,
    dirname: dirname,
    filename: filename,
    datePattern: dailyRotateOptions.datePattern,
    prepend: dailyRotateOptions.prepend,
    maxsize: maxsize,
    maxFiles: maxFiles,
    json: true,
    handleExceptions: false,
    colorize: true,
    prettyPrint: true,
    timestamp: true
  })
};

let consoleTransport = (name, level, label, formatter = (options) => {
  return options.timestamp() + ' ' + winston.config.colorize(options.level, options.level.toUpperCase()) + ' [' + label.toUpperCase() + '] ' + (undefined !== options.message ? options.message : '') +
    (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
}) => {
  return new winston.transports.Console({
    name: name,
    level: level,
    label: label,
    formatter: formatter,
    json: false,
    prettyPrint: true,
    handleExceptions: false,
    colorize: true,
    timestamp: () => {
      return moment().utc().format();
    }
  })
};

let serverLogger = (label) => {
  winston.loggers.add(label, {
    transports: [
      fileTransport('server-file-log', 'info', label, directories.server, '.log', {
        datePattern: 'yyyy-MM-dd',
        prepend: true
      }),
      consoleTransport('server-console-log', (process.env.SERVER_ENV === 'development' ? 'debug' : 'info'), label)
    ]
  });
  return winston.loggers.get(label);
};

let apiLogger = (label, version = "undefined") => {
  mkdirp(directories.api + version, function (errMkdirp) {
    if (errMkdirp) {
      serverLogger("APP").error(loggerMessage.DIRECTORY_CREATION_FAILURE, version);
    }
  });
  winston.loggers.add(label, {
    transports: [
      fileTransport('api-file-log', 'info', label, (directories.api + version + '/'), '.log', {
        datePattern: 'yyyy-MM-dd',
        prepend: true
      }),
      consoleTransport('server-console-log', (process.env.SERVER_ENV === 'development' ? 'debug' : 'info'), label)
    ]
  });
  return winston.loggers.get(label);
};

let trafficTracker = new winston.Logger({
  transports: [
    fileTransport('traffic-file-log', 'info', 'TRAFFIC', directories.traffic, '.log', {
      datePattern: 'yyyy-MM-dd',
      prepend: true
    }),
    consoleTransport('traffic-console-log', (process.env.SERVER_ENV === 'development' ? 'debug' : 'info'), 'TRAFFIC', undefined)
    // Formatting will be taken care by morgan
  ]
});

winston.handleExceptions([
  fileTransport('exception-file-log', undefined, undefined, directories.exception, '.log', {
    datePattern: 'yyyy-MM-dd',
    prepend: true
  }),
  new winston.transports.Console({
    humanReadableUnhandledException: true,
    colorize: true,
    prettyPrint: true
  })
]);

module.exports = {
  stream: split().on('data', (message) => {
    trafficTracker.info(message)
  }),
  server: serverLogger,
  api: apiLogger
}
