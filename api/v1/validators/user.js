'use strict';

let mustache = require('mustache');
let validator = require('validator');
let error = require('../language/en/validation/user');

module.exports = (req) => {
    let validationResult = {};

    // username
    let usernameError = [];
    if (!req.body.username || validator.isEmpty(req.body.username)) {
        usernameError.push(error.USERNAME_EMPTY);
    }
    validationResult.username = usernameError.length === 0 ? undefined : usernameError;

    let passwordError = [];
    if (!req.body.password || validator.isEmpty(req.body.password)) {
        passwordError.push(error.PASSWORD_EMPTY);
    }
    validationResult.password = passwordError.length === 0 ? undefined : passwordError;

    // let output = mustache.render("{{title}} spends {{calc}}", {
    //     title: "Joe",
    //     calc: 3,
    // });
    return validationResult;
}

