'use strict';

let async = require('async');
let rule = require('../rules');
let methods = require('./methods');
let logger = require('../../../../setup/logger').api('VALIDATOR', 'v1');
let loggerMessage = require('../../constants/logger');
let response = require('../../helpers/response');
let utils = require('../../helpers/utils');

let appendResult = (results, attributeName, result) => {
  if (result.length !== 0) {
    results[attributeName] = result;
  }
}

const validateObject = (req, res, next, callbackMain, option) => {
  let error = {};
  let resultValidation = {};
  async.parallel(option.field.map((attribute) => {
    return (callback) => { validateAttribute(req, resultValidation, error, rule[attribute], callback); }
  }), (errorAsync) => {
    if (errorAsync) {
      error.push(new Error(errorAsync));
    }
    if (!utils.isEmptyObject(error)) {
      return next({ logger: logger, message: loggerMessage.VALIDATION_ENGINE_FAILURE, data: error });
    } else {
      if (!utils.isEmptyObject(resultValidation)) {
        response.errorValidation(req, res, { field: resultValidation });
      } else {
        callbackMain();
      }
    }
  });
};

const validateAttribute = (req, result, error, options, callbackRootValidator) => {
  let errorList = [];
  if ((typeof options.required === 'boolean' && options.required) || options.required.value) {
    if (!methods["REQUIRE"](req, options.name, errorList, options.required)) {
      validateAttributeCore(req, result, error, options, callbackRootValidator, errorList);
    } else {
      appendResult(result, options.name, errorList);
      callbackRootValidator();
    }
  } else {
    // not-required + empty -> no validation
    if (!req.body[options.name] || (options.type === 'string' && req.body[options.name].length === 0)) {
      callbackRootValidator();
    } else {
      validateAttributeCore(req, result, error, options, callbackRootValidator, errorList);
    }
  }
};

const validateAttributeCore = (req, result, error, options, callbackRootValidator, errorList) => {
  if (methods["TYPE"](req, options.name, errorList, options.type)) {
    async.series(options.validator.map((option) => {
      return (callback) => { methods[option.function](error, req, options.name, errorList, option, callback) };
    }), () => {
      appendResult(result, options.name, errorList);
      callbackRootValidator();
    });
  } else {
    appendResult(result, options.name, errorList);
    callbackRootValidator();
  }
};

module.exports = { appendResult, validateAttribute, validateObject };