'use strict';

let router = require('express').Router();
let dbSanitizer = require('mongo-sanitize');

// let Book = require('../../../../database/models/book');
let logger = require('../../../../setup/logger').api('CONTROLLER', 'v1');
let apiLoggerMessage = require('../../constants/api.logger');
let validator = require('../../validators/models/book');
let response = require('../../helpers/response');
let error = require('../../constants/error');

router.route('/')

  .get((req, res, next) => {
    //TODO: Rewrite find, sanitize name
    // Book.find((errDB, books) => {
    //   //TODO: res
    //   if (errDB) {
    //     res.send(errDB);
    //   } else {
    //     res.json(books);
    //   }
    // });
  })

  .post(require('../../middlewares/authentication'), (req, res, next) => {
    //TODO: validation
    // let book = new Book({
    //   name: req.body.name,
    //   edition: req.body.edition,
    //   author: req.body.author,
    //   publisher: req.body.publisher,
    //   isbn: req.body.isbn
    // });
    // book.save((errDB) => {
    //   //TODO: res
    //   if (errDB) {
    //     res.send(errDB);
    //   } else {
    //     res.json({ message: 'Book added!' });
    //   }
    // });
  });

module.exports = router;