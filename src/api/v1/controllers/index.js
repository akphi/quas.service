"use strict";

let router = require("express").Router();
let books = require("./books");
let users = require("./users");

router.use("/books", books);
router.use("/users", users);

module.exports = router;