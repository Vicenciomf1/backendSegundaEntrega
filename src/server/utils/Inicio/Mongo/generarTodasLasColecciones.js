import {contenedorProductos} from "../../../router/productosRuta.js";
import {contenedorMensajes} from "../../../config/init.js";
import {contenedorCarrito} from "../../../router/carritoRuta.js";

import productosRaw from "../Objetos/productos.js";
import mensajesRaw from "../Objetos/mensajes.js";
import carritosRaw from "../Objetos/carritos.js";

export const generarTodoMongo = async () => {
  await contenedorProductos.saveMany(productosRaw);
  await contenedorMensajes.saveMany(mensajesRaw);
  await contenedorCarrito.saveMany(carritosRaw);
};

export const borrarTodoMongo = async () => {
  await contenedorProductos.deleteAll();
  await contenedorMensajes.deleteAll();
  await contenedorCarrito.deleteAll();
}



