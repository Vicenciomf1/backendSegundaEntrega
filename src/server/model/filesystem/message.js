import ContenedorFs from "../../contenedores/ContenedorFs.js";

export default class Mensajes extends ContenedorFs {
  constructor() {
    super("mensajes.txt");
  }
};