import sqlite from "../../../db/sqlite/sqliteconnection.js";
import mensajesRaw from "../Objetos/mensajes.js";
import crearGeneradorDeTablas from "./generadorDeTablasSql.js";


const tablacb = (tabla) => {
  tabla.increments("id").primary();

  tabla.string("email", 50).notNullable();
  tabla.string("text", 150).notNullable();

  tabla.timestamp('created_at').defaultTo(sqlite.fn.now());  // Luego lo devuelve como string, acá puedes formatearlo
  tabla.timestamp('updated_at').defaultTo(sqlite.fn.now());
};

const crearTablasMensajes = crearGeneradorDeTablas(sqlite, "mensajes", tablacb, mensajesRaw);

export default crearTablasMensajes;
