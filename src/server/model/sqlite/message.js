import ContenedorSql from "../../contenedores/ContenedorSql.js";
import sqlite from "../../db/sqlite/sqliteconnection.js";

//export default new Contenedor(sqlite, "mensajes");

export default class Mensaje extends ContenedorSql {
  constructor() {
    super(sqlite, "mensajes");
  }
};