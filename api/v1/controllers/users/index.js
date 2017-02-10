"use strict";

let router = require("express").Router();
let users = require("./users");
let login = require("./login");
let user = require("./user");
let authentication = require("../../middlewares/authentication");

router.use("/", users);
router.use("/login", login);
router.use("/:user_id", authentication, user);

module.exports = router;