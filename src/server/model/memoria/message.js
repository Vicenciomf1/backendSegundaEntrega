import ContenedorMemoria from "../../contenedores/ContenedorMemoria.js";

export default class Mensaje extends ContenedorMemoria {
  constructor() {
    super();  // Por defecto es objeto vacío y últimoId = 0
  }
}