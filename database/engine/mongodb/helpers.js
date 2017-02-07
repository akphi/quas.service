'use strict';

let moment = require("moment");

let stringToDate = (input) => {
  return new Date(input);
}

let parseDbObject = (input, callback) => {
  callback();
}

module.exports = { stringToDate, parseDbObject };