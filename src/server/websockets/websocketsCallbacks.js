import {contenedorProductos} from "../router/productosRuta.js";
import {contenedorMensajes} from "../config/init.js";

export const newProduct = async (server, data) => {
  await contenedorProductos.save(data);
  server.sockets.emit('producto', data);
};

export const newMessage = async (server, data) => {
  console.log("Nuevo mensaje", data);
  await contenedorMensajes.save(data);
  const listaDeMensajes = await contenedorMensajes.getAll();
  // server.sockets.emit('messages', data);  // Para esto actualiza el render de mensajes en index.js, es más óptimo
  server.sockets.emit("messages", listaDeMensajes);
  console.log("guardado");
};


export const connectionEvent = async (io, socket) => {
  console.log('Se ha conectado un nuevo cliente');

  //Para enviar todos los mensajes y productos en la primera conexión
  const listaDeProductos = await contenedorProductos.getAll();
  const listaMensajes = await contenedorMensajes.getAll();

  socket.emit('nueva-conexion', listaDeProductos);  // Cambia el nombre del evento
  socket.emit('messages', listaMensajes);

  socket.on("new-product", (data) => newProduct(io, data));
  socket.on("new-message", (data) => newMessage(io, data));

  socket.on('disconnect', () => console.log('Se ha desconectado un cliente'));
};

// (to-do) Extrae ambos new-objeto a un archivo, luego extrae la lógica del getAll a otro lado e impórtalo acá, luego exporta por defecto el conectionEvent