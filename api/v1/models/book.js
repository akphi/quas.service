'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = (connection) => {
  let bookSchema = new Schema({
    name: { type: String, required: true },
    edition: { type: Number },
    author: { type: String, required: true },
    publisher: { type: String },
    isbn: { type: String }
  });
  return connection.model('Book', bookSchema);
}