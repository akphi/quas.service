'use strict';

let mustache = require('mustache');
let config = require('../server').config;

let error = (req, message) => {
  if (message.params) {
    return mustache.render(require('./' + (req.headers["x-language"] ? req.headers["x-language"] : config.get("LANGUAGE_DEFAULT")) + '/error')[message.code], message.params);
  }
  return require('./' + (req.headers["x-language"] ? req.headers["x-language"] : config.get("LANGUAGE_DEFAULT")) + '/error')[message];
};

let validation = (req, errors) => {
  let language = (req.headers["x-language"] ? req.headers["x-language"] : config.get("LANGUAGE_DEFAULT"));
  for (var field in errors) {
    errors[field] = errors[field].map((message) => {
      if (message.params) {
        return mustache.render(require('./' + language + '/validation')[message.code], message.params);
      }
      return require('./' + language + '/validation')[message];
    });
  }
  return errors;
};

module.exports = { error, validation };