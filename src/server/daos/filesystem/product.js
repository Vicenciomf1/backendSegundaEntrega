import ContenedorFs from "../../contenedores/ContenedorFs.js";

export default class Mensaje extends ContenedorFs {
  constructor() {
    super("productos.txt");
  }
};