'use strict';

let router = require('express').Router()
let config = require('../../../../setup/config');
let User = require('../../models/user');
let logger = require('../../../../setup/logger')('CONTROLLER');
let password = require('../../helpers/password');
let jwt = require('jsonwebtoken');

router.route('/')

  .post((req, res) => {
    //TODO: sanitize db
    User.findOne({
      name: req.body.name
    }, (errDB, user) => {
      //TODO: res
      if (errDB) {
        res.send(errDB);
      } else {
        if (!user) {
          //TODO: res
          res.status(400).send({
            success: false, message: 'Authentication failed. User not found.'
          });
        } else if (user) {
          password.verifyPassword(req.body.password, Buffer.from(user.password, 'base64'), (err, result) => {
            if (result) {
              // if user is found and password is right create a token
              let token = jwt.sign({
                user: {
                  name: user.name,
                  role: user.role
                }
              }, config.get('NODE_JWT_SECRET'), {
                  expiresIn: 86400 // expires in 24 hours
                });
                //TODO: res
              res.status(200).send({
                success: true,
                message: 'Enjoy your token!',
                token: 'Bearer' + ' ' + token
              });
            } else {
              //TODO: res
              res.status(400).send({
                success: false, message: 'Authentication failed. Wrong password.'
              });
            }
          });
        }
      }
    });
  });

module.exports = router
