'use strict';

let router = require('express').Router();
let config = require('../../../../setup/config');
let User = require('../../../../database/models/user');
let logger = require('../../../../setup/logger').api('CONTROLLER', 'v1');

router.route('/')
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