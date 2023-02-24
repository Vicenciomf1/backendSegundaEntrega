import ContenedorMongo from "../../contenedores/ContenedorMongo.js";
import { Schema } from "mongoose";

const esquema = new Schema({
  email: { type: String, required: true },
  text: { type: String, required: true }
});

export default class Mensaje extends ContenedorMongo {
  constructor() {
    super("mensajes", esquema);
  }
};
