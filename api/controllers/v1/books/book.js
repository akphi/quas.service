'use strict';

var router = require('express').Router()
var Book = require('../../../models/book');
var logger = require('../../../helpers/logger')('CONTROLLER');

router.route('/')

  .get((req, res) => {
    Book.findById(req.params.book_id, (err, book) => {
      if (err) {
        res.send(err);
      }
      res.json(book);
    });
  })

  .put((req, res) => {
    Book.findById(req.params.book_id, (err, book) => {
      if (err) {
        res.send(err);
      }
      book.name = req.body.name;
      book.edition = (req.body.edition ? req.body.edition : 0);
      book.author = (req.body.author ? req.body.author : 'noone');
      book.publisher = (req.body.publisher ? req.body.publisher : 'them');
      book.save((err) => {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Book updated!' });
      });
    });
  })

  .delete((req, res) => {
    Book.remove({
      _id: req.params.book_id
    }, (err, book) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Book removed' });
    });
  });

module.exports = router