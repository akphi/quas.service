'use strict';

var router = require('express').Router()
var config = require('../../../config/initializers/config');
var User = require('../../models/user'); // get our mongoose model
var logger = require('../../helpers/logger')('CONTROLLER-USERS');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

router.route('/')

  .post((req, res) => {
    User.findOne({
      name: req.body.name
    }, (err, user) => {
      if (err) throw err;
      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {
        // check if password matches
        if (user.password != req.body.password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
          // if user is found and password is right create a token
          var token = jwt.sign({
            user: {
              name: user.name,
              role: user.role
            }
          }, config.get('NODE_JWT_SECRET'), {
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

module.exports = router
