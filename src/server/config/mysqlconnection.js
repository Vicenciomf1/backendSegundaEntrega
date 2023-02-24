import knex from "knex";

const options = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3307,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'mibase'
  }
};

const mysql = knex(options);  // Si la conexión se pierde, ¿cómo evito que se caiga el server y atrapo el error?

export default mysql;
