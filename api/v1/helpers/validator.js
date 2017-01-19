'use strict';

let dbSanitizer = require('mongo-sanitize');
let mustache = require('mustache');
let validator = require('validator');

let validateLength = (errorValidation, req, schema, attributeName, result, bound, message, callback) => {
  if (bound.min && bound.max) {
    if (req.body[attributeName].length < bound.min || req.body[attributeName].length > bound.max) {
      result.push(mustache.render(message, {
        minLength: bound.min,
        maxLength: bound.max,
      }));
    }
  } else if (!bound.min) {
    if (req.body[attributeName].length > bound.max) {
      result.push(mustache.render(message, {
        maxLength: bound.max,
      }));
    }
  } else if (!bound.max) {
    if (req.body[attributeName].length < bound.min) {
      result.push(mustache.render(message, {
        minLength: bound.min,
      }));
    }
  }
  callback();
}

let validateDuplication = (errorValidation, req, schema, attributeName, result, message, callback) => {
  let query = new Object();
  query[attributeName] = dbSanitizer(req.body[attributeName]);
  schema.findOne(query, (errDB, user) => {
    if (errDB) {
      errorValidation = new Error(errDB);
    } else {
      if (user) {
        result.push(message);
      }
    }
    callback();
  });
}

let validationEmpty = (req, attributeName, result, message) => {
  if (!req.body[attributeName] || validator.isEmpty(req.body[attributeName])) {
    result.push(message);
    return true;
  }
  return false;
}

let validateMatch = (errorValidation, req, schema, attributeName, result, patterns, message, callback) => {
  var matchResult = patterns.map((pattern) => {
    return validator.matches(req.body[attributeName], pattern);
  }).reduce(function (a, b) {
    return (a && b);
  }, true);
  if (!matchResult) {
    result.push(message);
  }
  callback();
}

let appendResult = (results, attributeName, result) => {
  if (result.length !== 0) {
    results[attributeName] = result;
  }
}

module.exports = { appendResult, validateLength, validateDuplication, validationEmpty, validateMatch };