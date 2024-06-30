import "dotenv/config";

const { Pool, Client } = require("pg");

const config = {
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(config);

pool.query(
  "CREATE TABLE IF NOT EXISTS clientes (id_cliente SERIAL PRIMARY KEY, nombre VARCHAR(60) NOT NULL, expediente VARCHAR(200) NOT NULL UNIQUE, deudatotal FLOAT NOT NULL, pagoparcial FLOAT NOT NULL);"
);

export { pool };

/*
CREATE TABLE clientes (

	id_cliente SERIAL PRIMARY KEY,
	nombre VARCHAR(60) NOT NULL,
	expediente VARCHAR(200) NOT NULL UNIQUE,
	deudatotal FLOAT NOT NULL,
	pagoparcial FLOAT NOT NULL
	
);
*/
