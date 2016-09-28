'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    name: String,
    edition: Number,
    author: String,
    publisher: String
});

module.exports = mongoose.model('Book', BookSchema);