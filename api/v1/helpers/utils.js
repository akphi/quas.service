'use strict';

let moment = require("moment");
let config = require('../server').config;
let type = require("../constants/models").type;

let isEmptyObject = (object) => {
  if (Object.keys(object).length === 0 && object.constructor == Object) {
    return true;
  }
  return false;
}

let parseDbObject = (input, dbType, callback) => {
  if (dbType) {
    return require('../../../database/engine/' + dbType + '/helpers').parseDbObject(input, callback);
  }
  return callback();
}

let convertType = (typeInput, input, callback) => {
  switch (typeInput) {
    case type.STRING:
      input = String(input);
      return callback(null, input);
    case type.NUMBER:
      input = Number(input);
      return callback(null, input);
    case type.BOOLEAN:
      input = Boolean(input);
      return callback(null, input);
    case type.DATE:
      input = new Date(input).toISOString();
      return callback(null, input);
    default:
      return callback(null, input);
  }
}

module.exports = { isEmptyObject, convertType, parseDbObject };