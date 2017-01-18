'use strict';

let router = require('express').Router()
let dbSanitizer = require('mongo-sanitize');

let User = require('../../models/user');
let logger = require('../../../../setup/logger')('CONTROLLER');
let password = require('../../helpers/password');
let validator = require('../../validators/user');
let constants = require('../../constants/user');

let response = require('../../helpers/response');
let error = require('../../constants/error');

router.route('/')

  //TODO: fix this method
  .get((req, res) => {
    User.find({}, function (errDB, users) {
      if (errDB) {
        res.send(errDB);
      } else {
        res.json(users);
      }
    });
  })

  .post((req, res) => {
    User.findOne({
      name: dbSanitizer(req.body.name)
    }, (errDB, user) => {
      if (errDB) {
        logger.error("DATABASE: ", errDB);
        response(res, {
          status: 503,
          error: error.DATABASE,
        });
      } else {
        if (user) {
          logger.error("User already existed");
          response(res, {
            status: 503,
            error: error.DATABASE,
          });
        } else {
          let validationResults = validator(req);
          if (Object.keys(validationResults).length !== 0 || validationResults.constructor !== Object) {
            response(res, {
              status: 400,
              error: error.VALIDATION,
              field: validationResults,
            });
          } else {
            password.hashPassword(req.body.password, (errHashPassword, combined) => {
              if (errHashPassword) {
                logger.error("SERVER: cannot hash password - ", errHashPassword);
                response(res, {
                  status: 500,
                  error: error.SERVER,
                });
              } else {
                let user = new User({
                  username: req.body.username,
                  password: combined.toString('base64'),
                  role: constants.USER_ROLE,
                });
                user.save(function (errDB) {
                  if (errDB) {
                    logger.error("DATABASE: cannot persist user - ", errDB);
                    response(res, {
                      status: 503,
                      error: error.DATABASE,
                    });
                  } else {
                    logger.info("User is created and persisted");
                    response(res, {
                      status: 200,
                      error: error.SUCCESS,
                    });
                  }
                });
              }
            });
          }
        }
      }
    });
  });

module.exports = router;