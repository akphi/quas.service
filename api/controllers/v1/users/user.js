'use strict';

var router = require('express').Router()
var config = require('../../../../config/initializers/config');
var User = require('../../../models/user');
var logger = require('../../../helpers/logger')('CONTROLLER');

router.route('/')
  .get((req, res) => {
    User.find({}, (err, users) => {
      res.json(users);
    });
  })

module.exports = router