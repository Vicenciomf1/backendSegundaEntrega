import ContenedorMongo from "../../contenedores/ContenedorMongo.js";
import { Schema } from "mongoose";

export const esquemaProductos = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  codigo: { type: Number, required: true },
  precio: { type: Number, required: true },
  foto: { type: String, required: true },
  stock: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },  // Este es el timestamp que piden
  updated_at: { type: Date, default: Date.now }  // Hay un operador que te actualiza esto en mongo, se llama $currentDate
});

export default class Producto extends ContenedorMongo {
  constructor() {
    super("productos", esquemaProductos);
  }
};
