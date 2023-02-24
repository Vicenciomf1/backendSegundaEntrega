import mysql from "../../../config/mysqlconnection.js";
import productosRaw from "../Objetos/productos.js";
import crearGeneradorDeTablas from "./generadorDeTablasSql.js";

const tablacb = (tabla) => {
  tabla.increments("id").primary();

  tabla.string("nombre", 50).notNullable();
  tabla.string("descripcion", 150).notNullable();
  tabla.integer("codigo").notNullable().unique();
  tabla.integer("precio").notNullable();
  tabla.string("foto").notNullable();
  tabla.integer("stock").notNullable();

  tabla.timestamp('created_at').defaultTo(mysql.fn.now());
  tabla.timestamp('updated_at').defaultTo(mysql.fn.now());
};

const crearTablasProductos = crearGeneradorDeTablas(mysql, "productos", tablacb, productosRaw);

export default crearTablasProductos;



