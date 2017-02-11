"use strict";

module.exports = {
  name: { type: String, required: true },
  edition: { type: Number },
  author: { type: String, required: true },
  publisher: { type: String },
  isbn: { type: String }
}