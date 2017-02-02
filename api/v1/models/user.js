'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let database = require('../../../setup/database');
let bean = require('./beans/user');

let modelCreator = (connection) => {
    let userSchema = new Schema(bean)
    return connection.model('User', userSchema);
}

module.exports = {
    user: modelCreator(database.mongodb.user.connection),
    public: modelCreator(database.mongodb.public.connection)
}