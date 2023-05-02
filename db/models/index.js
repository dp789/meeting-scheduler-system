const { Sequelize } = require("sequelize");

const dbConfig = require("../config");
const dotenv = require("dotenv");

dotenv.config({ path: `.env.local` });

const db = {};

const sequelize = new Sequelize(dbConfig.url, {
  ...dbConfig,
});

db.events = require("./events").model(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = sequelize;

module.exports = db;
