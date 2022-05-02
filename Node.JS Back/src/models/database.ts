import { dbConfig } from '../config/db.config';
import { Sequelize }  from 'sequelize';
import { initModels } from './initModels';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  // operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

let DB = {
    Sequelize: Sequelize,
    sequelize: sequelize
};


export const repositories = initModels(sequelize)
export default DB;