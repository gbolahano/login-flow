import { Sequelize } from 'sequelize';
import config from "../config/db";

const sequelize = new Sequelize(
  config.database,
  config.username,
  (config.password) as any,
  {...config} as any
);

export default sequelize;