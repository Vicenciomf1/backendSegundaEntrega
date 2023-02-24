export default class ContenedorSql {
  constructor(db, tabla) {
    this.db = db;
    this.tabla = tabla;
  }

  async getAll() {
    return await this.db
      .from(this.tabla)
      .select("*");  // ¿Cómo hago el destroy aquí?
  }

  async getById(id) {
    return await this.db
      .from(this.tabla)
      .select("*")
      .where("id", id);
  }

  async save(producto) {
    return await this.db
      .from(this.tabla)
      .insert(producto);
  }

  async updateById(id, nuevoProducto) {
    return await this.db
      .from(this.tabla)
      .where("id", id)
      .update(nuevoProducto);
  }

  async deleteById(id) {
    return await this.db
      .from(this.tabla)
      .where("id", id)
      .del();
  }

  async deleteAll() {
    return await this.db
      .from(this.tabla)
      .del();
  }
}