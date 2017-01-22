'use strict';

let router = require('express').Router()
let dbSanitizer = require('mongo-sanitize');

let User = require('../../models/user');
let logger = require('../../../../setup/logger').api('CONTROLLER', 'v1');
let loggerMessage = require('../../constants/logger');
let password = require('../../helpers/password');
let validator = require('../../validators/models/user');
let constants = require('../../constants/user');

let response = require('../../helpers/response');
let error = require('../../constants/error');

router.route('/')

  //TODO: fix this method
  .get((req, res) => {
    User.find({}, (errDB, users) => {
      if (errDB) {
        res.send(errDB);
      } else {
        res.json(users);
      }
    });
  })

  .post((req, res) => {
    validator.registration(req, (errValidation, result) => {
      if (Object.keys(errValidation).length !== 0 || errValidation.constructor !== Object) {
        logger.error(loggerMessage.VALIDATION_ENGINE_FAILURE, errValidation);
        res.status(500).json({});
      } else {
        if (Object.keys(result).length !== 0 || result.constructor !== Object) {
          response.errorValidation(req, res, { field: result });
        } else {
          password.hashPassword(req.body.password, (errHashPassword, combined) => {
            if (errHashPassword) {
              logger.error(loggerMessage.PASSWORD_HASHER_FAILURE, errValidation);
              res.status(500).json({});
            } else {
              let user = new User({
                username: req.body.username,
                password: combined.toString('base64'),
                role: constants.USER_ROLE,
              });
              user.save((errDB) => {
                if (errDB) {
                  logger.error(loggerMessage.DATABASE_USER_PERSISTENCE_FAILURE, errDB);
                  res.status(500).json({});
                } else {
                  logger.info(loggerMessage.DATABASE_USER_PERSISTENCE_SUCCESS, user.username);
                  response.success(req, res);
                }
              });
            }
          });
        }
      }
    });
  });

module.exports = router;