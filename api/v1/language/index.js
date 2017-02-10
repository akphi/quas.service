"use strict";

let mustache = require("mustache");
let config = require("../server").config;
let languages = {
  en: require("./en")
}

let error = (req, message) => {
  let language = (req.headers["x-language"] ? req.headers["x-language"] : config.get("LANGUAGE_DEFAULT"));
  if (message.params) {
    return mustache.render(languages[language].error[message.code], message.params);
  }
  return languages[language].error[message];
};

let validation = (req, errors) => {
  let language = (req.headers["x-language"] ? req.headers["x-language"] : config.get("LANGUAGE_DEFAULT"));
  for (var field in errors) {
    errors[field] = errors[field].map((message) => {
      if (message.params) {
        return mustache.render(languages[language].validation[message.code], message.params);
      }
      return languages[language].validation[message];
    });
  }
  return errors;
};

module.exports = { error, validation };