'use strict';

var router = require('express').Router()
var config = require('../../../config/initializers/config');
var User = require('../../models/user'); // get our mongoose model
var logger = require('../../helpers/logger')('CONTROLLER-USERS');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var password = require('../../helpers/password');

router.route('/')

  .post((req, res) => {
    User.findOne({
      name: req.body.name
    }, (err, user) => {
      if (err) throw err;
      if (!user) {
        res.status(400).send({
          success: false, message: 'Authentication failed. User not found.'
        });
      } else if (user) {
        password.verifyPassword(req.body.password, Buffer.from(user.password, 'base64'), (err, result) => {
          if (result) {
            // if user is found and password is right create a token
            var token = jwt.sign({
              user: {
                name: user.name,
                role: user.role
              }
            }, config.get('NODE_JWT_SECRET'), {
                expiresIn: 86400 // expires in 24 hours
              });
            res.status(200).send({
              success: true,
              message: 'Enjoy your token!',
              token: token
            });
          } else {
            res.status(400).send({
              success: false, message: 'Authentication failed. Wrong password.'
            });
          }
        });
      }
    });
  });

module.exports = router
