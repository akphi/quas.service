'use strict';

let error = require('../constants/error');
let message = require('../language/en/error');

module.exports = (res, options) => {
  return res.status(options.status).json({
    code: options.error,
    message: (options.message ? options.message : options.error === error.SUCCESS ? undefined : message[options.error]),
    field: (options.field ? options.field : undefined),
    data: (options.data ? options.data : undefined),
  });
}