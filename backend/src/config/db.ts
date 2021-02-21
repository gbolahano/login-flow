import getEnv from "./getEnv";

export default {
  username: getEnv("DB_USERNAME", "root"),
  password: getEnv("DB_PASSWORD", "password"),
  database: getEnv("DB_DATABASE", "banner"),
  host: getEnv("DB_HOST", "localhost"),
  port: getEnv("DB_PORT", 3306),
  dialect: "mysql",
  quoteIdentifiers: false,
  logging: false,
};
