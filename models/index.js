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
//for one to many relationship between congregation to rooms
//db.congregations.hasMany(db.rooms, { as: "rooms" });
db.rooms.belongsTo(db.congregations, {
  foreignKey: "CongregationId",
  allowNull: false,
  as: "congregations",
});


module.exports = db;