'use strict';

let dbSanitizer = require('mongo-sanitize');
let mustache = require('mustache');
let validator = require('validator');

const LENGTH = (error, req, attributeName, result, options, callback) => {
  if (options.values.min && options.values.max) {
    if (req.body[attributeName].length < options.values.min || req.body[attributeName].length > options.values.max) {
      result.push(mustache.render(options.message ? options.message : "LENGTH_BOUNDED", {
        min: options.values.min,
        max: options.values.max,
      }));
    }
  } else if (!options.values.min) {
    if (req.body[attributeName].length > options.values.max) {
      result.push(mustache.render(options.message ? options.message : "LENGTH_UPPER", {
        max: options.values.max,
      }));
    }
  } else if (!options.values.max) {
    if (req.body[attributeName].length < options.values.min) {
      result.push(mustache.render(options.message ? options.message : "LENGTH_LOWER", {
        min: options.values.min,
      }));
    }
  }
  callback();
}

const DUPLICATION = (error, req, attributeName, result, options, callback) => {
  let query = new Object();
  query[attributeName] = dbSanitizer(req.body[attributeName]);
  options.values.schema.findOne(query, (errDB, user) => {
    if (errDB) {
      error.push(new Error(errDB));
    } else {
      if (user) {
        result.push(options.message);
      }
    }
    callback();
  });
}

const REQUIRE = (req, attributeName, result, options = {}) => {
  if (!req.body[attributeName] || validator.isEmpty(req.body[attributeName])) {
    result.push(options.message ? options.message : "REQUIRED");
    return true;
  }
  return false;
}

const MATCH = (error, req, attributeName, result, options, callback) => {
  var matchResult = options.values.patterns.map((pattern) => {
    return validator.matches(req.body[attributeName], pattern);
  }).reduce(function (a, b) {
    return (a && b);
  }, true);
  if (!matchResult) {
    result.push(options.message ? options.message : "MISMATCH");
  }
  callback();
}

module.exports = { LENGTH, DUPLICATION, REQUIRE, MATCH };