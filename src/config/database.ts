// import { Pool } from 'pg';
// import dotenv from 'dotenv';

// dotenv.config();

// // Create a PostgreSQL connection pool
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: Number(process.env.DB_PORT),
// });

// // Connect to the database and log a message upon success
// pool.connect()
//   .then(() => {
//     console.log('PostgreSQL connected successfully!');
//   })
//   .catch((err) => {
//     console.error('Error connecting to PostgreSQL:', err.message);
//     process.exit(1); // Exit the process if the connection fails
//   });

// export default pool;


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
  pool: { min: 2, max: 10 },  // Optional: Define pool size
});

knex.raw('SELECT 1')
  .then(() => {
    console.log('PostgreSQL connected successfully using Knex!');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL with Knex:', err.message);
    process.exit(1);  // Exit the process if the connection fails
  });

export default knex;
