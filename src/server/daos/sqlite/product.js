import ContenedorSql from "../../contenedores/ContenedorSql.js";
import sqlite from "../../db/sqlite/sqliteconnection.js";

//import mysqlconnection from "../config/mysqlconnection.js";

export default class Producto extends ContenedorSql {
  constructor() {
    super(sqlite, "productos");
  }
};