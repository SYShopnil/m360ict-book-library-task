import Knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Knex instance
const knex = Knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
  },
  pool: { min: 2, max: 10 },
});

knex
  .raw('SELECT 1')
  .then(() => {
    console.log(
      `PostgreSQL connected successfully using Knex! at Port:${process.env.DB_PORT}`,
    );
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL with Knex:', err.message);
    process.exit(1);
  });

export default knex;
