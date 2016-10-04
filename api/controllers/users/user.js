'use strict';

var router = require('express').Router()
var config = require('../../../config/initializers/config');
var User = require('../../models/user'); // get our mongoose model
var logger = require('../../helpers/logger')('CONTROLLER-USERS');

router.route('/')
  .get((req, res) => {
    User.find({}, (err, users) => {
      res.json(users);
    });
  })

module.exports = router