const dbConfig = require("../config/db.config.js");

const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.congregations = require("./congregation.js")(sequelize, Sequelize);
db.rooms = require("./room.js")(sequelize, Sequelize);
db.familys = require("./family.js")(sequelize, Sequelize);
db.persons = require("./person.js")(sequelize, Sequelize);
db.events = require("./event.js")(sequelize, Sequelize);
db.addresses = require("./address.js")(sequelize, Sequelize);
db.role = require("./role.js")(sequelize, Sequelize);

//for one to many relationship between congregation to rooms
//db.congregations.hasMany(db.rooms, { as: "rooms" });
db.rooms.belongsTo(db.congregations, {
  foreignKey: "CongregationId",
  allowNull: false,
  as: "congregations",
});

db.familys.belongsTo(db.congregations, {
  foreignKey: "CongregationId",
  allowNull: false,
  as: "congregations",
});
db.persons.belongsTo(db.congregations, {
  foreignKey: "CongregationId",
  allowNull: false,
  as: "congregations",
});

db.persons.belongsTo(db.familys, {
  foreignKey: "FamilyId",
  allowNull: false,
  as: "familys",
});

db.addresses.belongsTo(db.persons, {
  foreignKey: "PersonId",
  allowNull: false,
  as: "people",
});

// db.addresses.belongsTo(db.familys, {
//   foreignKey: "FamilyId",
//   allowNull: false,
//   as: "familys",
// });

// db.familys.belongsTo(db.addresses, {
//   foreignKey: "AddressId",
//   allowNull: false,
//   as: "addresses",
// });
db.persons.belongsTo(db.events, {
  foreignKey: "EventId",
  allowNull: false,
  as: "events",
});

db.role.belongsToMany(db.persons, {
  through: "person_roles",
  foreignKey: "roleId",
  otherKey: "personId"
});

db.persons.belongsToMany(db.role, {
  through: "person_roles",
  foreignKey: "personId",
  otherKey: "roleId"
});

module.exports = db;