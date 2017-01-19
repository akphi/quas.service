'use strict';

let async = require('async');
let validator = require('validator');
let errorMessage = require('../language/en/validation/user');
let constants = require('../constants/user');
let validatorHelper = require('../helpers/validator');

let registration = (req, callbackValidation) => {
    let errorValidation;
    let resultValidation = {};
    async.parallel([
        (callback) => {
            validateAttribute(req, resultValidation, errorValidation, USERNAME, callback);
        },
        (callback) => {
            validateAttribute(req, resultValidation, errorValidation, PASSWORD, callback);
        },
    ], (err) => {
        if (err) {
            errorValidation = new Error(err);
        } else {
            callbackValidation(errorValidation, resultValidation);
        }
    });
};

let validateAttribute = (req, result, error, options, callbackRootValidator) => {
    let errorList = [];
    if (options.required) {
        if (!validatorHelper.validationEmpty(req, options.name, errorList, options.required_option)) {
            async.series(options.validator.map((option) => {
                return (callback) => { validatorHelper[option.function](error, req, options.schema, options.name, errorList, option, callback) };
            }), () => {
                validatorHelper.appendResult(result, options.name, errorList);
                callbackRootValidator();
            });
        } else {
            validatorHelper.appendResult(result, options.name, errorList);
            callbackRootValidator();
        }
    } else {
        async.series(options.validator.map((option) => {
            return (callback) => { validatorHelper[option.function](error, req, options.schema, options.name, errorList, option, callback) };
        }), () => {
            validatorHelper.appendResult(result, options.name, errorList);
            callbackRootValidator();
        });
    }
};

const PASSWORD = {
    name: "password",
    required: {
        value: true
    },
    schema: require('../models/user'),
    validator: [{
        function: "validateLength",
        message: errorMessage.PASSWORD_LENGTH,
        values: {
            min: constants.PASSWORD_MIN_LENGTH,
            max: constants.PASSWORD_MAX_LENGTH,
        }
    }]
}

const USERNAME = {
    name: "username",
    required: {
        value: true
    },
    schema: require('../models/user'),
    validator: [{
        function: "validateLength",
        message: errorMessage.USERNAME_LENGTH,
        values: {
            min: constants.USERNAME_MIN_LENGTH,
            max: constants.USERNAME_MAX_LENGTH,
        }
    },
    {
        function: "validateDuplication",
        message: errorMessage.USERNAME_DUPLICATED,
        values: {}
    },
    {
        function: "validateMatch",
        message: errorMessage.USERNAME_RULE_1,
        values: {
            patterns: [new RegExp("^[a-zA-Z0-9._]+$")]
        }
    },
    {
        function: "validateMatch",
        message: errorMessage.USERNAME_RULE_2,
        values: {
            patterns: [new RegExp("^(?!.*[_.]{2})$")]
        }
    },
    {
        function: "validateMatch",
        message: errorMessage.USERNAME_RULE_3,
        values: {
            patterns: [new RegExp("^(?![_.])"), new RegExp("[^_.]$")]
        }
    }]
}

module.exports = { registration };