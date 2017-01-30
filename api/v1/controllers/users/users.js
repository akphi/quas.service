'use strict';

let router = require('express').Router();

let User = require('../../models/user');
let logger = require('../../../../setup/logger').api('CONTROLLER', 'v1');
let loggerMessage = require('../../constants/logger');
let password = require('../../helpers/password');
let response = require('../../helpers/response');
let validator = require('../../validators/models/user');
let constants = require('../../constants/user');

router.route('/')

  //TODO: fix this method
  .get((req, res, next) => {
    User.find({}, (errDB, users) => {
      if (errDB) {
        res.send(errDB);
      } else {
        res.json(users);
      }
    });
  })

  .post((req, res, next) => {
    validator.registration(req, res, next, () => {
      password.hashPassword(req.body.password, (errHashPassword, result) => {
        if (errHashPassword) {
          return next({ logger: logger, message: loggerMessage.PASSWORD_HASHER_FAILURE, data: errHashPassword });
        }
        let user = new User({
          username: req.body.username,
          password: result.toString('base64'),
          role: constants.USER_ROLE,
        });
        user.save((errDB) => {
          if (errDB) {
            return next({ logger: logger, message: loggerMessage.DATABASE_USER_PERSISTENCE_FAILURE, data: errDB });
          }
          response.success(req, res);
        });
      });
    });
  });

module.exports = router;