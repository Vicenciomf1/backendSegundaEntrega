import ContenedorMongo from "../../contenedores/ContenedorMongo.js";
import { Schema } from "mongoose";

const esquema = new Schema({
  email: { type: String, required: true },
  text: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default class Mensaje extends ContenedorMongo {
  constructor() {
    super("mensajes", esquema);
  }
};
