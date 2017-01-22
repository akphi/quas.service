'use strict';

let router = require('express').Router()
let Book = require('../../models/book');
let logger = require('../../../../setup/logger').api('CONTROLLER', 'v1');

router.route('/')

  .get((req, res) => {
    //TODO: Rewrite find, sanitize name
    Book.find((errDB, books) => {
      //TODO: res
      if (errDB) {
        res.send(errDB);
      } else {
        res.json(books);
      }
    });
  })

  .post(require('../../middlewares/authentication'), (req, res) => {
    //TODO: validation
    let book = new Book();
    book.name = req.body.name;
    book.edition = req.body.edition;
    book.author = req.body.author;
    book.publisher = req.body.publisher;
    book.isbn = req.body.isbn;
    book.save((errDB) => {
      //TODO: res
      if (errDB) {
        res.send(errDB);
      } else {
        res.json({ message: 'Book added!' });
      }
    });
  });

module.exports = router;