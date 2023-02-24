import {io} from "../config/init.js";
import {contenedorProductos} from "../router/productosRuta.js";
import {contenedorMensajes} from "../config/init.js";

export const connectionEvent = async (socket) => {
  console.log('Se ha conectado un nuevo cliente');

  const listaDeProductos = await contenedorProductos.getAll();
  socket.emit('nueva-conexion', listaDeProductos);

  socket.on("new-product", (data) => {
    contenedorProductos.save(data);
    io.sockets.emit('producto', data);
  });

  //Para enviar todos los mensajes en la primera conexion
  const listaMensajes = await contenedorMensajes.getAll();
  socket.emit('messages', listaMensajes);

  //Evento para recibir nuevos mensajes
  socket.on('new-message', async data => {
    await contenedorMensajes.save(data);
    const listaDeMensajes = await contenedorMensajes.getAll();
    io.sockets.emit('messages', listaDeMensajes);
  });

  socket.on('disconnect', () => {
    console.log('Se ha desconectado un cliente');
  });
};