'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    role: { type: Number, required: true },
}));