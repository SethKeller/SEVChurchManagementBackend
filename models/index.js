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
db.groups = require("./group")(sequelize, Sequelize);
db.groupPersons = require("./groupPerson")(sequelize, Sequelize);

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
  CONSTRAINT: false,
  as: "congregations",
});
db.groups.belongsTo(db.congregations, {
  foreignKey: "CongregationId",
  allowNull: false,
  as: "congregations",
});
db.groupPersons.belongsTo(db.groups, {
  foreignKey: "GroupId",
  allowNull: false,
  CONSTRAINT:false,
  as: "groups",
});
db.persons.hasMany(db.groupPersons, { as: "groupPersons" });
db.groupPersons.belongsTo(db.persons, {
  foreignKey: "personId",
  allowNull: false,
  CONSTRAINT: false,
  as: "people",
});
db.familys.hasMany(db.persons, { foreignKey: "FamilyId", as: "people" });
db.persons.belongsTo(db.familys, {
  foreignKey: "FamilyId",
  allowNull: false,
  as: "familys",
});
db.persons.hasMany(db.addresses, { foreignKey: "PersonId", as: "addresses" });
db.addresses.belongsTo(db.persons, {
  foreignKey: "PersonId",
  allowNull: true,
  CONSTRAINT:false,
  as: "people",
});
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