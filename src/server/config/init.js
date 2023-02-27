 import express from "express";
import {engine} from "express-handlebars";
import {Server as IOServer} from "socket.io";

import {__dirname} from "../utils/dirname.js";
import path from "path";
import dotenv from "dotenv";

import ViteExpress from "vite-express";
import Mensaje from "../daos/mongo/message.js";

dotenv.config();
const app = express();
export const PORT = process.env.PORT || 3000;
ViteExpress.config({ mode: "development", vitePort: 8080 });

// No sabía dónde más ponerlo para tenerlo disponible D:
export const contenedorMensajes = new Mensaje();

// Rutas desde utils
const viewsRoot = path.resolve(__dirname, "../views");
const layoutsDir = path.resolve(__dirname, "../views/layouts");


// Para usar json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Para el motor de plantillas
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'index.hbs',
  layoutsDir
}));
app.set('views', viewsRoot);
app.set('view engine', 'hbs');

//Crear cositas para la entrega de websockets

const http = ViteExpress.listen(app, PORT, () => {
  console.log(`Server escuchando en el puerto de Vite para sólo frontend, y en el puerto ${PORT} para fullstack`);
  console.log(`Abre http://localhost:${PORT} en el navegador para ver la app del cliente junto con el server de Express`);
  console.log(`La clave para ser administrador es 'authorization':'${process.env.TOKEN}' en el header de tu request`);
});

export const io = new IOServer(http);

export default app;
