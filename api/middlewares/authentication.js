'usestrict';

let config = require('../../config/initializers/config');
let corser = require('corser');
let logger = require('../helpers/logger')('MIDDLEWARE');
let jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
let response = require('../helpers/response');

module.exports = function (req, res, next) {
  let token = req.body.token || req.query.token || req.headers['authorization'];
  if (token) {
    jwt.verify(token, config.get('NODE_JWT_SECRET'), (err, decoded) => {
      if (err) {
        // ERROR IN TOKEN VALIDATION
        return response(res, null, 500, 'TK003', null);
      } else {
        // AUTHICATED
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // NO TOKEN
    return response(res, null, 403, 'TK004', null);
  }
};
