'use strict';

let dbSanitizer = require('mongo-sanitize');
let mustache = require('mustache');
let validator = require('validator');
let message = require('../language/en/validation/general');

let validateLength = (errorValidation, req, schema, attributeName, result, options, callback) => {
  if (options.values.min && options.values.max) {
    if (req.body[attributeName].length < options.values.min || req.body[attributeName].length > options.values.max) {
      result.push(mustache.render(options.message, {
        min: options.values.min,
        max: options.values.max,
      }));
    }
  } else if (!options.values.min) {
    if (req.body[attributeName].length > options.values.max) {
      result.push(mustache.render(options.message, {
        maxLength: options.values.max,
      }));
    }
  } else if (!options.values.max) {
    if (req.body[attributeName].length < options.values.min) {
      result.push(mustache.render(options.message, {
        minLength: options.values.min,
      }));
    }
  }
  callback();
}

let validateDuplication = (errorValidation, req, schema, attributeName, result, options, callback) => {
  let query = new Object();
  query[attributeName] = dbSanitizer(req.body[attributeName]);
  schema.findOne(query, (errDB, user) => {
    if (errDB) {
      errorValidation = new Error(errDB);
    } else {
      if (user) {
        result.push(options.message);
      }
    }
    callback();
  });
}

let validationEmpty = (req, attributeName, result, options = {}) => {
  if (!req.body[attributeName] || validator.isEmpty(req.body[attributeName])) {
    result.push(options ? options.message : message.REQUIRED);
    return true;
  }
  return false;
}

let validateMatch = (errorValidation, req, schema, attributeName, result, options, callback) => {
  var matchResult = options.values.patterns.map((pattern) => {
    return validator.matches(req.body[attributeName], pattern);
  }).reduce(function (a, b) {
    return (a && b);
  }, true);
  if (!matchResult) {
    result.push(options.message);
  }
  callback();
}

let appendResult = (results, attributeName, result) => {
  if (result.length !== 0) {
    results[attributeName] = result;
  }
}

module.exports = { appendResult, validateLength, validateDuplication, validationEmpty, validateMatch };