'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BookSchema = new Schema({
  name: { type: String, required: true },
  edition: { type: Number },
  author: { type: String, required: true },
  publisher: { type: String },
  isbn: { type: String }
});

module.exports = mongoose.model('Book', BookSchema);