import ContenedorMongo from "../../contenedores/ContenedorMongo.js";
import { Schema } from "mongoose";


const esquema = new Schema({
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  productos: [Schema.Types.Mixed], // Por ahora queda flexible, luego usamos [esquemaProductos]
});

export default class ShoppingCartSinNormalizar extends ContenedorMongo {
  constructor() {
    super("carritos", esquema);
  }
};

