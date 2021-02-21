require('dotenv').config({ path: __dirname + '/../../variables.env' });
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    quoteIdentifiers: false,
    logging: false,
  }
}
