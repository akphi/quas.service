'use strict';

let dbSanitizer = require('mongo-sanitize');
let mustache = require('mustache');
let validator = require('validator');

let validateLength = (req, attributeName, error, bound, message, callback) => {
  if (bound.min && bound.max) {
    if (req.body[attributeName].length < bound.min || req.body[attributeName].length > bound.max) {
      error.push(mustache.render(message, {
        minLength: bound.min,
        maxLength: bound.max,
      }));
    }
  } else if (!bound.min) {
    if (req.body[attributeName].length > bound.max) {
      error.push(mustache.render(message, {
        maxLength: bound.max,
      }));
    }
  } else if (!bound.max) {
    if (req.body[attributeName].length < bound.min) {
      error.push(mustache.render(message, {
        minLength: bound.min,
      }));
    }
  }
  callback();
}

let validateDuplication = (req, schema, attributeName, error, errorValidation, message, callback) => {
  let query = new Object();
  query[attributeName] = dbSanitizer(req.body[attributeName]);
  schema.findOne(query, (errDB, user) => {
    if (errDB) {
      errorValidation = new Error(errDB);
    } else {
      if (user) {
        error.push(message);
      }
    }
    callback();
  });
}

let validationEmpty = (req, attributeName, errorList, message) => {
  if (!req.body[attributeName] || validator.isEmpty(req.body[attributeName])) {
    errorList.push(message);
    return true;
  }
  return false;
}

let validateMatch = (req, attributeName, errorList, patterns, message, callback) => {
  var matchResult = patterns.map((pattern) => {
    console.log(pattern);
    return validator.matches(req.body[attributeName], pattern);
  }).reduce(function (a, b) {
    return (a && b);
  }, true);
  if (!matchResult) {
    errorList.push(message);
  }
  callback();
}

let appendResult = (result, attributeName, errorList) => {
  if (errorList.length !== 0) {
    result[attributeName] = errorList;
  }
}

module.exports = { appendResult, validateLength, validateDuplication, validationEmpty, validateMatch };