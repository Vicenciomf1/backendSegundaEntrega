import {io} from "../config/init.js";

//import products from "../../../../knex/knex-coderhouse/src/models/product.js";
//import messages from "../../../../knex/knex-coderhouse/src/models/message.js";

const products = [];
const messages = [];

export const connectionEvent = async (socket) => {
  console.log('Se ha conectado un nuevo cliente');

  const listaDeProductos = await products.getAll();
  socket.emit('nueva-conexion', listaDeProductos);

  socket.on("new-product", (data) => {
    products.save(data);
    io.sockets.emit('producto', data);
  });

  //Para enviar todos los mensajes en la primera conexion
  const listaMensajes = await messages.getAll();
  socket.emit('messages', listaMensajes);

  //Evento para recibir nuevos mensajes
  socket.on('new-message', async data => {
    await messages.save(data);
    const listaDeMensajes = await messages.getAll();
    io.sockets.emit('messages', listaDeMensajes);
  });

  socket.on('disconnect', () => {
    console.log('Se ha desconectado un cliente');
  });
};