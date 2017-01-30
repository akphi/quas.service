'use strict';

let validatorHelper = require('../helpers/validator');

const registration = (req, res, next, callback) => {
    validatorHelper.validateObject(req, res, next, callback, {
        field: ["USER_USERNAME", "USER_PASSWORD"]
    })
};

module.exports = { registration };