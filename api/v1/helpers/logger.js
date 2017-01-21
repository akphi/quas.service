'use strict';

let moment = require('moment');
let winston = require('winston');

module.exports = (label) => {
  winston.loggers.add(label, {
    file: {
      name: 'info-log',
      level: 'info',
      filename: '../../../log/API_v1.log',
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
      level: 'debug',
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
