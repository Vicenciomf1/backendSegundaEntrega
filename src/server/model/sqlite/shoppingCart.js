import ContenedorSql from "../../contenedores/ContenedorSql.js";
import sqlite from "../../db/sqlite/sqliteconnection.js";

export default class ShoppingCart extends ContenedorSql {
  constructor() {
    super(sqlite, "carritos");
  }
}