'use strict';

let mongoose = require('mongoose');
let mongodbSchema = mongoose.Schema;
let mysqlSchema = require('../engine/mysql/helpers').Schema;
let database = require('../engine');

let mongodbModelCreator = (modelName) => {
  let userSchema = new mongodbSchema(require('./beans/' + modelName), { collection: modelName })
  return {
    user: database.mongodb.user.connection.model(modelName, userSchema),
    public: database.mongodb.public.connection.model(modelName, userSchema)
  }
}

let mysqlModelCreator = (name) => {
  return {
    user: new mysqlSchema(name, database.mysql.user.connection),
    public: new mysqlSchema(name, database.mysql.public.connection)
  }
}

let models = {
  user: mongodbModelCreator("user"),
  user_mysql: mysqlModelCreator("user")
}

let get = (name, privilege) => {
  return models[name][privilege];
};

module.exports = { get };