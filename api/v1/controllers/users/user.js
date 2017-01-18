'use strict';

let router = require('express').Router()
let config = require('../../../../setup/config');
let User = require('../../models/user');
let logger = require('../../../../setup/logger')('CONTROLLER');

router.route('/')
  .get((req, res) => {
    //TODO: name, sanitize
    User.find({}, (errDB, users) => {
      //TODO: res
      if (errDB) {
        res.send(errDB);
      } else {
        res.json(users);
      }
    });
  })

module.exports = router