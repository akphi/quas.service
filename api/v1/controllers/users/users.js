"use strict";

let router = require("express").Router();

let logger = require("../../server").logger.api("CONTROLLER", "v1");
let apiMessage = require("../../constants/api.logger");
let response = require("../../helpers/response");
let validator = require("../../validators/models/user");
let models = require("../../models");

let Mysql = require("../../server").databaseEngine.mysql;

router.route("/")

  //TODO: fix this method
  .get((req, res, next) => {
    Mysql.tool.find(["id", "username"], { username: "apk" }, "user", Mysql.as("public"), (errDB, result) => {
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
        Mysql.tool.insert(user, "user", Mysql.as("user"), (errDB) => {
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