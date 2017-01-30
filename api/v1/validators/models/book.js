'use strict';

let validatorHelper = require('../helpers/validator');

const add = (req, res, callback) => {
    validatorHelper.validateObject(req, res, callback, {
        field: ["BOOK_NAME", "BOOK_EDITION", "BOOK_AUTHOR", "BOOK_PUBLISHER", "BOOK_ISBN"]
    })
};

module.exports = { add };

// ten thoai mai/ required 
// tac gia: required
// edition: number
// isbn: verify -> override validator library
// publisher: required