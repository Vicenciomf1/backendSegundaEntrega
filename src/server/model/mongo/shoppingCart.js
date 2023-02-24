import ContenedorMongo from "../../contenedores/ContenedorMongo.js";
import {esquemaProductos} from "./product.js";
import { Schema } from "mongoose";


const esquema = new Schema({
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  productos: [esquemaProductos]
});

export default class Carrito extends ContenedorMongo {
  constructor() {
    super("carritos", esquema);
  }
};

