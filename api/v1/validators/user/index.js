'use strict';

let validatorHelper = require('../helpers/validator');

const registration = (req, callbackMain) => {
    validatorHelper.validateObject(req, callbackMain, {
        field: ["USER_USERNAME", "USER_PASSWORD"]
    })
};

module.exports = { registration };