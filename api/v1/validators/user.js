'use strict';

let async = require('async');
let validator = require('validator');

let User = require('../models/user');
let errorMessage = require('../language/en/validation/user');
let constants = require('../constants/user');
let validatorHelper = require('../helpers/validator');

let registration = (req, callbackValidation) => {
    let errorValidation;
    let resultValidation = {};
    async.parallel([
        (callbackD) => {
            validateUsername(req, resultValidation, errorValidation, callbackD);
        },
        // password
        (callbackPassword) => {
            let passwordError = [];
            if (!req.body.password || validator.isEmpty(req.body.password)) {
                passwordError.push(errorMessage.PASSWORD_EMPTY);
            }
            validatorHelper.appendResult(resultValidation, "password", passwordError);
            callbackPassword();
        },
    ], (err) => {
        if (err) {
            errorValidation = new Error(err);
        } else {
            callbackValidation(errorValidation, resultValidation);
        }
    });
};

let validateUsername = (req, result, error, callbackGroup) => {
    let usernameError = [];
    if (!validatorHelper.validationEmpty(req, "username", usernameError, errorMessage.USERNAME_EMPTY)) {
        async.series([
            (callback) => {
                validatorHelper.validateLength(req, "username", usernameError, {
                    min: constants.USERNAME_MIN_LENGTH,
                    max: constants.USERNAME_MAX_LENGTH,
                }, errorMessage.USERNAME_LENGTH, callback);
            },
            (callback) => { validatorHelper.validateDuplication(req, User, "username", usernameError, error, errorMessage.USERNAME_DUPLICATED, callback); },
            (callback) => { validatorHelper.validateMatch(req, "username", usernameError, [new RegExp("^(?![_.])"), new RegExp("[^_.]$")], errorMessage.USERNAME_RULE_1, callback) },
        ], () => {
            validatorHelper.appendResult(result, "username", usernameError);
            callbackGroup();
        });
    } else {
        validatorHelper.appendResult(result, "username", usernameError);
        callbackGroup();
    }
};

module.exports = { registration };