'usestrict';

var moment = require('moment');
var winston = require('winston');

module.exports = (label) => {
    let a = winston.loggers.add(label, {
        file: {
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