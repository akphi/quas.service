'use strict';

let router = require('express').Router()
let dbSanitizer = require('mongo-sanitize');

let User = require('../../models/user');
let config = require('../../../../setup/config');
let logger = require('../../../../setup/logger')('CONTROLLER');
let password = require('../../helpers/password');
let validator = require('../../validators/user');
let constants = require('../../constants/user');

router.route('/')

  //TODO: fix this method
  .get((req, res) => {
    User.find({}, function (errDB, users) {
      if (errDB) {
        res.send(errDB);
      } else {
        res.json(users);
      }
    });
  })

  .post((req, res) => {
    User.findOne({
      name: dbSanitizer(req.body.name)
    }, (errDB, user) => {
      if (errDB) {
        //TODO: res
        res.send(errDB);
      } else {
        if (user) {
          //TODO: res
          res.status(400).send({
            success: false, message: 'User already existed.'
          });
        } else {
          //TODO: validator
          let validationResults = validator(req,res);
          if(Object.keys(validationResults).length !== 0 || validationResults.constructor !== Object) {
            //TODO: res
            res.json({ error: validationResults });
          } else {
            password.hashPassword(req.body.password, (errHashPassword, combined) => {
              //TODO: handle errHashPassword with 500?
              let user = new User({
                name: req.body.name,
                password: combined.toString('base64'),
                //TODO: role?
                role: constants.USER_ROLE,
              });
              user.save(function (errDB) {
                if (errDB) {
                  //TODO: res
                  res.send(errDB);
                } else {
                  //TODO: res
                  res.json({ success: true });
                }
              });
            });
          }
        }
      }
    });
  });

module.exports = router;