import { Sequelize } from 'sequelize';

const PORT = process.env.DB_PORT;
const PGPORT = process.env.PG_PORT;
// const sequelize = new Sequelize('joel', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql',
//   port: PORT,
//   logging: false,
// });

const sequelize = new Sequelize('hr_tracker', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  port: PGPORT,
  logging: false,
});

export default sequelize;
