'use strict';

let router = require('express').Router();

let logger = require('../../server').logger.api('CONTROLLER', 'v1');
let apiMessage = require('../../constants/api.logger');
let response = require('../../helpers/response');
let validator = require('../../validators/models/user');
let models = require('../../models');

let Mysql = require('../../server').databaseEngine.mysql;

router.route('/')

  //TODO: fix this method
  .get((req, res, next) => {
    // // mongoDB.connection().authenticate();
    // mongoDB.connection().collection("user").save({ username: "an" }, (errDB, users) => {
    //   // mongoDB.connection().collection("userds");
    //   if (errDB) {
    //     res.send(errDB);
    //   } else {
    //     res.json(users);
    //   }
    // });
    Mysql.tool.findOne(["id", "username"], { username: "apk" }, "user", Mysql.user.connection, (errDB, result) => {
      if (errDB) {
        return next({ logger: logger, error: { message: apiMessage.DATABASE_PERSISTENCE_FAILURE, data: errDB } });
      } else {
        response.success(req, res, { data: result });
      }
    });
  })

  .post((req, res, next) => {
    validator.registration(req, res, next, (processingInstruction) => {
      models.modelize("user", "mongodb", processingInstruction, req.body, (errorProcessing, user) => {
        if (errorProcessing) {
          return next({ logger: logger, error: errorProcessing });
        }
        Mysql.tool.insert(user, "user", Mysql.user.connection, (errDB) => {
          if (errDB) {
            return next({ logger: logger, error: { message: apiMessage.DATABASE_PERSISTENCE_FAILURE, data: errDB } });
          } else {
            response.success(req, res);
          }
        });
      });
    });
  });

module.exports = router;