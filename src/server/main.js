import app, {io} from "./config/init.js";
import {connectionEvent} from "./websockets/websocketsCallbacks.js";
import productosRuta from "./router/productosRuta.js";
import carritoRuta from "./router/carritoRuta.js";


// Endpoints no tomados por el enrutador del cliente

app.get('/', (req, res) => {
  res.render('templates/chat');
});

app.use("/api/productos", productosRuta);
app.use("/api/carrito", carritoRuta);


// Eventos de websockets
io.on("connection", connectionEvent);
