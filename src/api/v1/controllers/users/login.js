"use strict";

let router = require("express").Router();
let config = require("../../server").config;
// let User = require("../../../../database/models/").get("user", "user");
let logger = require("../../server").logger.api("CONTROLLER", "v1");
let jwt = require("jsonwebtoken");

router.route("/")

  .post((req, res, next) => {
    //TODO: sanitize db
    // User.findOne({
    //   name: req.body.name
    // }, (errDB, user) => {
    //   //TODO: res
    //   if (errDB) {
    //     res.send(errDB);
    //   } else {
    //     if (!user) {
    //       //TODO: res
    //       res.status(400).send({
    //         success: false, message: "Authentication failed. User not found."
    //       });
    //     } else if (user) {
    //       password.verifyPassword(req.body.password, Buffer.from(user.password, "base64"), (err, result) => {
    //         if (result) {
    //           // if user is found and password is right create a token
    //           let token = jwt.sign({
    //             user: {
    //               name: user.name,
    //               role: user.role
    //             }
    //           }, config.get("TOKEN_JWT_SECRET"), {
    //               expiresIn: Number(config.get("TOKEN_JWT_EXPIRE")) // expires in 24 hours
    //             });
    //           //TODO: res
    //           res.status(200).send({
    //             success: true,
    //             message: "Enjoy your token!",
    //             token: `Bearer ${token}`
    //           });
    //         } else {
    //           //TODO: res
    //           res.status(400).send({
    //             success: false, message: "Authentication failed. Wrong password."
    //           });
    //         }
    //       });
    //     }
    //   }
    // });
  });

module.exports = router