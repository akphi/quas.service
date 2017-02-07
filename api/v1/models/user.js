'use strict';
let encryptor = require('../helpers/encryption');
let apiLoggerMessage = require('../constants/api.logger');

module.exports = {
  username: { type: String, required: true },
  password: {
    type: String, required: true,
    postProcess: (data, field, callback) => {
      encryptor.applyHashSalt(data[field], (errHashPassword, result) => {
        if (errHashPassword) {
          callback({ message: apiLoggerMessage.ENCRYPTION_HASHER_FAILURE, data: errHashPassword });
        } else {
          data[field] = result;
          callback();
        }
      })
    }
  },
  role: { type: Number, default: 1 }
}