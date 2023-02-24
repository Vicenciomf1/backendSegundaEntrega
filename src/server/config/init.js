import express from "express";
import {engine} from "express-handlebars";
import {Server as IOServer} from "socket.io";

import {__dirname} from "../utils/dirname.js";
import path from "path";
import * as dotenv from "dotenv";

import ViteExpress from "vite-express";
dotenv.config();

const app = express();
export const PORT = process.env.PORT || 8080;
ViteExpress.config({ mode: "development" });

// Rutas desde utils
const publicRoot = path.resolve(__dirname, "../../public");
const viewsRoot = path.resolve(__dirname, "../views");
const layoutsDir = path.resolve(__dirname, "../views/layouts");


// Para usar json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicRoot));

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
