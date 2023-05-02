const Sequelize = require("sequelize");
const dotenv = require("dotenv");
const mysql2 = require("mysql2");

dotenv.config({ path: `.env.local` });

module.exports = {
  url: process.env.DB_URI,
  host: process.env.HOST,
  database: process.env.DATABASE_NAME,
  dialectModule: mysql2,
  dialect: "mysql",
  pool: {
    min: 0,
    max: 10,
    idle: 10000,
  },
  define: {
    underscored: true,
    timestamps: false,
  },
  retry: {
    match: [
      "unknown timed out",
      Sequelize.TimeoutError,
      "timed",
      "timeout",
      "TimeoutError",
      "Operation timeout",
      "refuse",
      "SQLITE_BUSY",
    ],
    max: 10,
  },
};
