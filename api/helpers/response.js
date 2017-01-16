'use strict';

let message = require('../language/en/error');

//TODO think of smart error message
module.exports = (res, data, statusCode, code, field) => {
  if (data) {
    // SUCESS
    return res.json({
      code: 'RC000',
      message: null,
      fields: null,
      data: data
    });
  } else {
    // ERROR
    return res.status(statusCode).json({
      code: code,
      message: message[code],
      fields: field
    });
  }
}