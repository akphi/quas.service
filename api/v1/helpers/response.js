'use strict';

let config = require('../../../setup/config');
let errorCode = require('../constants/error');
let message = require('../language');

let response = (req, res, defaults, options = {}) => {
  let status = options.status ? options.status : defaults.status;
  return res.status(status).json({
    code: (options.error ? options.error : defaults.code),
    message: (options.message ? options.message : message.error(req, (defaults.code ? defaults.code : options.error))),
    field: (options.field ? message.validation(req, options.field) : undefined),
    data: (options.data ? options.data : undefined),
  });
}

let error = (req, res, options = {}) => {
  response(req, res, {
    status: 400,
  }, options)
};

let success = (req, res, options = {}) => {
  response(req, res, {
    status: 200,
    code: errorCode.SUCCESS,
  }, options)
};

let errorValidation = (req, res, options = {}) => {
  response(req, res, {
    status: 400,
    code: errorCode.VALIDATION,
  }, options)
};

let errorSystem = (err, req, res, next) => {
  if (err.logger) {
    (err.logger).error(err.message, err.data);
  } else {
    require('../../../setup/logger').api('UNIDENTIFIED', 'v1').error(err.message, err.data);
  }
  res.status(err.status || 500)
    .json(config.get('SERVER_ENV') === 'development' ? {
      message: err.message,
      data: err.data
    } : {});
}

module.exports = { error, success, errorValidation, errorSystem };