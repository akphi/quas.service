'use strict';

let errorCode = require('../constants/error');
let message = require('../language/en/error');

let error = (res, options = {}) => {
  let status = options.status ? options.status : "400";
  return res.status(status).json({
    code: options.error,
    message: (options.message ? options.message : message[options.error]),
    field: (options.field ? options.field : undefined),
    data: (options.data ? options.data : undefined),
  });
}

let success = (res, options = {}) => {
  let status = options.status ? options.status : "200";
  return res.status(status).json({
    code: (options.error ? options.error : errorCode.SUCCESS),
    message: (options.message ? options.message : undefined),
    field: (options.field ? options.field : undefined),
    data: (options.data ? options.data : undefined),
  });
}

let errorServer = (res, options = {}) => {
  let status = options.status ? options.status : "500";
  return res.status(status).json({
    code: (options.error ? options.error : errorCode.SERVER),
    message: (options.message ? options.message : message[errorCode.SERVER]),
    field: (options.field ? options.field : undefined),
    data: (options.data ? options.data : undefined),
  });
}

let errorDatabase = (res, options = {}) => {
  let status = options.status ? options.status : "500";
  return res.status(status).json({
    code: (options.error ? options.error : errorCode.DATABASE),
    message: (options.message ? options.message : message[errorCode.DATABASE]),
    field: (options.field ? options.field : undefined),
    data: (options.data ? options.data : undefined),
  });
}

let errorValidation = (res, field, options = {}) => {
  let status = options.status ? options.status : "400";
  return res.status(status).json({
    code: (options.error ? options.error : errorCode.VALIDATION),
    message: (options.message ? options.message : message[errorCode.VALIDATION]),
    field: field,
    data: (options.data ? options.data : undefined),
  });
}

module.exports = { error, success, errorDatabase, errorServer, errorValidation };