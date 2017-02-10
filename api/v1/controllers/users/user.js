"use strict";

let router = require("express").Router();
let config = require("../../server").config;
// let User = require("../../../../database/models/").get("user","user");
let logger = require("../../server").logger.api("CONTROLLER", "v1");

router.route("/")
  // .get((req, res, next) => {
  //   //TODO: name, sanitize
  //   User.find({}, (errDB, users) => {
  //     //TODO: res
  //     if (errDB) {
  //       res.send(errDB);
  //     } else {
  //       res.json(users);
  //     }
  //   });
  // })

module.exports = router