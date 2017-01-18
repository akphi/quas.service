'use strict';

let router = require('express').Router()
let config = require('../../../../config/initializers/config');
let User = require('../../models/user');
let logger = require('../../helpers/logger')('CONTROLLER');

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