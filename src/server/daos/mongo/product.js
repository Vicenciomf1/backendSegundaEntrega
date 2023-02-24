import ContenedorMongo from "../../contenedores/ContenedorMongo.js";
import { Schema } from "mongoose";

export const esquemaProductos = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  codigo: { type: Number, required: true },
  precio: { type: Number, required: true },
  foto: { type: String, required: true },
  stock: { type: Number, required: true }
});

export default class Producto extends ContenedorMongo {
  constructor() {
    super("productos", esquemaProductos);
  }
};
