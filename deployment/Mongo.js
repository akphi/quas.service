// sudo mongod -dbpath ../db/quas_mongodb_db/
// mongo
use admin;
db.createUser({
  user: "quas_root",
  pwd: "quas_password",
  roles: [
    { role: "root", db: "admin" }
  ]
});
// sudo mongod -dbpath ../db/quas_mongodb_db/ --auth
// mongo -u quas_root -p quas_password --authenticationDatabase admin
use quas_mongodb_db;
db.createCollections("users");
db.createUser({
  user: "quas_admin",
  pwd: "quas_password",
  roles: [
    { role: "dbOwner", db: "quas_mongodb_db" }
  ]
});

db.createRole({
  role: "restrictedReadWrite",
  roles: [],
  privileges: [
    { resource: { db: "quas_mongodb_db", collection: "user" }, actions: ["find", "insert", "remove", "update"] }
  ]
});

db.createRole({
  role: "restrictedRead",
  roles: [],
  privileges: [
    { resource: { db: "quas_mongodb_db", collection: "user" }, actions: ["find"] }
  ]
});

db.createUser({
  user: "quas_user",
  pwd: "quas_password",
  roles: [
    { role: "restrictedReadWrite", db: "quas_mongodb_db" }
  ]
});

db.createUser({
  user: "quas_public",
  pwd: "quas_password",
  roles: [
    { role: "restrictedRead", db: "quas_mongodb_db" }
  ]
});