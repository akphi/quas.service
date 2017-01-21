'use strict';

let config = require('../../../setup/config');

let error = (req, code) => {
  return require('./' + (req.headers["x-language"] ? req.headers["x-language"] : config.get("LANGUAGE_DEFAULT")) + '/error')[code];
};

let validation = (req, errors) => {
  let language = (req.headers["x-language"] ? req.headers["x-language"] : config.get("LANGUAGE_DEFAULT"));
  for (var field in errors) {
    errors[field] = errors[field].map((code) => {
      return require('./' + language + '/validation')[code];
    });
  }
  return errors;
};

module.exports = { error, validation };