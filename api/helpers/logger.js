'usestrict';

var moment = require('moment');
var winston = require('winston');
var split = require('split');
module.exports = (label) => {
  winston.loggers.add(label, {
    file: {
      name: 'info-log',
      level: 'info',
      filename: './log/main.log',
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
      timestamp: true
      // // Customize Formatter
      // timestamp: () => {
      //     return moment().utc().format();
      // },
      // formatter: (options) => {
      //     console.log(options);
      //     // Return string will be passed to logger.
      //     return options.timestamp() + ' ' + winston.config.colorize(options.level, options.level.toUpperCase()) + ' [' + label + '] ' + (undefined !== options.message ? options.message : '') +
      //         (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
      // }
    }
  });
  return winston.loggers.get(label);
};


let trafficTracker = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: './log/traffic.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: true,
      prettyPrint: true,
      timestamp: true,
      label: 'TRAFFIC'
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      prettyPrint: true,
      colorize: true,
      timestamp: true,
      label: 'TRAFFIC'
    })
  ],
  exitOnError: false
});

module.exports.stream = split().on('data', function (message) {
  trafficTracker.info(message)
})
