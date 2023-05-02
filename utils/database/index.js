const { Sequelize } = require("sequelize");
const dbConfig = require("../../db/config.js");

let client;

const connect = async () => {
  client = new Sequelize(dbConfig.url, {
    ...dbConfig,
  });

  try {
    await client.authenticate();
    console.log("Connection has been established successfully.\n", {
      db_uri: dbConfig.url,
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};

module.exports = connect;
