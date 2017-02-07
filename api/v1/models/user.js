'use strict';
let hasher = require('../helpers/encryption');
let apiLoggerMessage = require('../constants/api.logger');

//TODO fix this hashsalt thing
module.exports = {
  username: { type: String, required: true },
  password: {
    type: String, required: true,
    postProcess: (data, field, callback) => {
      hasher.hashPassword(data[field], (errHashPassword, result) => {
        if (errHashPassword) {
          callback({ message: apiLoggerMessage.PASSWORD_HASHER_FAILURE, data: errHashPassword });
        } else {
          data[field] = result.toString('base64');
          callback();
        }
      })
    }
  },
  role: { type: Number, default: 1 }
}