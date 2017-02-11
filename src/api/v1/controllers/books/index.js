"use strict";

let express = require("express");
let router = express.Router();
let books = require("./books");
let book = require("./book");

router.use("/", books);
router.use("/:book_id", book);

module.exports = router;