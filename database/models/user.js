'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let database = require('../engine');
let bean = require('./beans/user');

let modelCreator = (connection) => {
    let userSchema = new Schema(bean, { collection: 'user' })
    return connection.model('user', userSchema);
}

module.exports = {
    user: modelCreator(database.mongodb.user.connection),
    public: modelCreator(database.mongodb.public.connection)
}