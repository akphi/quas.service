'use strict';

var express = require('express')
var router = express.Router()
var User = require('../models/user'); // get our mongoose model
var logger = require('../helpers/logger')('CONTROLLER-USERS');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

router.route('/:user_id');
router.route('/login')
  .post((req, res) => {
    User.findOne({
      name: req.body.name
    }, function (err, user) {

      if (err) throw err;

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {

        // check if password matches
        if (user.password != req.body.password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {

          // if user is found and password is right
          // create a token
          var token = jwt.sign(user, require('../../config/initializers/config').get('NODE_JWT_SECRET'), {
            expiresIn: 86400 // expires in 24 hours
          });

          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }
      }
    });
  });

router.route('/logout');

router.route('/')
  .get((req, res) => {
    User.find({}, function (err, users) {
      res.json(users);
    });
  })

  .post((req, res) => {
    var nick = new User({
      name: 'An Phi',
      password: 'password',
      type: 1
    });
    nick.save(function (err) {
      if (err) throw err;
      console.log('User saved successfully');
      res.json({ success: true });
    });
  });

module.exports = router