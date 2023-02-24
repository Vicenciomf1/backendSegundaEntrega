import ContenedorFs from "../../contenedores/ContenedorFs.js";

export default class ShoppingCart extends ContenedorFs {
  constructor() {
    super("carritos.txt");
  }
}