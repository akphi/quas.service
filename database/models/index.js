'use strict';

let mysqlSchema = require('../engine/mysql/helpers').Schema;
let database = require('../engine');

let mongodbModelCreator = (modelName) => {
  // let userSchema = new mongodbSchema(require('./beans/' + modelName), { collection: modelName })
  return {
    user: database.mongodb.user.connection,
    public: database.mongodb.public.connection
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