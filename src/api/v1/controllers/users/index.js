"use strict";

let router = require("express").Router();
let users = require("./users");
let login = require("./login");
let user = require("./user");
let role = require("../../constants/role");
let authentication = require("../../middlewares/authentication");

/* NOTES ON DATA 'roles':
     * 1. roles = undefined --> public routes: NO authentication + NO role -> DO NOT REDIRECT if Authenticated
     * 2. roles = null --> semi-public routes NO authentication + NO role -> REDIRECT if Authenticated
     * 3. roles = [] --> authentication
     * 4. roles = [...] --> authentication + role
     */
//({ exclude: [] })

router.use("/", users);
router.use("/login", login);
router.use("/:user_id", authentication("admin"), user);

module.exports = router;