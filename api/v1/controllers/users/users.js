'use strict';

let router = require('express').Router();

let logger = require('../../').server.logger.api('CONTROLLER', 'v1');
let loggerMessage = require('../../').server.loggerMessage;
let response = require('../../helpers/response');
let validator = require('../../validators/models/user');
let models = require('../../models');

// let User = require('../../../../database/models').get("user", "user");
// let User_mysql = require('../../../../database/models').get("user_mysql", "user");

// let databaseConnection = require('../../../../database/engine/mysql').user;

let mongoDB = require('../../').server.databaseEngine.mongoDB.public;

// let database = require('../../../../database/engine/mysql/helpers');

router.route('/')

  //TODO: fix this method
  .get((req, res, next) => {
    // mongoDB.connection().authenticate();
    mongoDB.connection().collection("user").save({ username: "an" }, (errDB, users) => {
      // mongoDB.connection().collection("userds");
      if (errDB) {
        res.send(errDB);
      } else {
        res.json(users);
      }
    });
  })

  .post((req, res, next) => {
    // User_mysql.find((errDB, result) => {
    //   if (errDB) return next({ logger: logger, message: loggerMessage.DATABASE_USER_PERSISTENCE_FAILURE, data: errDB });
    // });
    validator.registration(req, res, next, (processingInstruction) => {
      console.log(processingInstruction);
      models.modelize("user", "mongodb", processingInstruction, req.body, (errorProcessing, user) => {
        if (errorProcessing) {
          return next({ logger: logger, error: errorProcessing });
        }
        console.log(user);
        // let user;
        // user.save((errDB) => {
        //   if (errDB) {
        //     return next({ logger: logger, message: loggerMessage.DATABASE_USER_PERSISTENCE_FAILURE, data: errDB });
        //   }
        //   response.success(req, res);
        // });
      });
    });
  });

module.exports = router;