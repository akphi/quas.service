'use strict';

let router = require('express').Router();
let Book = require('../../../../database/models/book');
let logger = require('../../../../setup/logger').api('CONTROLLER', 'v1');

router.route('/')

  .get((req, res, next) => {
    // //TODO: sanitize 
    // Book.findById(req.params.book_id, (errDB, book) => {
    //   //TODO: res
    //   if (errDB) {
    //     res.send(errDB);
    //   } else {
    //     res.json(book);
    //   }
    // });
  })

  .put((req, res, next) => {
    // //TODO: sanitize
    // Book.findById(req.params.book_id, (errDB, book) => {
    //   if (errDB) {
    //     //TODO: res
    //     res.send(errDB);
    //   } else {
    //     //TODO: validation
    //     book.name = req.body.name;
    //     book.edition = (req.body.edition ? req.body.edition : 0);
    //     book.author = (req.body.author ? req.body.author : 'noone');
    //     book.publisher = (req.body.publisher ? req.body.publisher : 'them');
    //     book.isbn = (req.body.isbn ? req.body.isbn : '00100-001');
    //     book.save((errDB) => {
    //       //TODO: res
    //       if (errDB) {
    //         res.send(errDB);
    //       } else {
    //         res.json({ message: 'Book updated!' });
    //       }
    //     });
    //   }
    // });
  })

  .delete((req, res, next) => {
    // //TODO: sanitize
    // Book.remove({
    //   _id: req.params.book_id
    // }, (errDB, book) => {
    //   //TODO: res
    //   if (errDB) {
    //     res.send(errDB);
    //   } else {
    //     res.json({ message: 'Book removed' });
    //   }
    // });
  });

module.exports = router