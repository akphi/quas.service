'use strict';

var router = require('express').Router()
var config = require('../../../config/initializers/config');
var User = require('../../models/user'); // get our mongoose model
var logger = require('../../helpers/logger')('CONTROLLER-USERS');

router.route('/')

  .get((req, res) => {
    User.find({}, function (err, users) {
      res.json(users);
    });
  })

  .post((req, res) => {
    var nick = new User({
      name: req.body.name,
      password: req.body.password,
      role: 1
    });
    nick.save(function (err) {
      if (err) throw err;
      console.log('User saved successfully');
      res.json({ success: true });
    });
  });

module.exports = router