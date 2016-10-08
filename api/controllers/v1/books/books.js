'use strict';

var router = require('express').Router()
var Book = require('../../../models/book');
var logger = require('../../../helpers/logger')('CONTROLLER-BOOKS');

router.route('/')

  .get((req, res) => {
    Book.find((err, books) => {
      if (err) {
        res.send(err);
      }
      res.json(books);
    });
  })

  .post((req, res) => {
    var book = new Book();
    book.name = req.body.name;
    book.edition = req.body.edition;
    book.author = req.body.author;
    book.publisher = req.body.publisher;
    book.save((err) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Book added!' });
    });
  });

module.exports = router