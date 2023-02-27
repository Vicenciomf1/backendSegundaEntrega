import { Router } from "express";
import ShoppingCartSinNormalizar from "../daos/mongo/shoppingCartSinNormalizar.js";
import { contenedorProductos } from "./productosRuta.js";

const carritoRuta = Router();
export const contenedorCarrito = new ShoppingCartSinNormalizar();


// Crear carro
carritoRuta.post("/", async (req, res) => {
  const carrito = { productos: [] };
  const id = await contenedorCarrito.save(carrito);
  res.json({ "ID del carro nuevo": id });
});

// Eliminar carro
carritoRuta.delete("/:id", async (req, res) => {
  const {acknowledged, deletedCount} = await contenedorCarrito.deleteById(req.params.id);  // true y 1 cuando elimina uno
  (acknowledged && deletedCount===1)
    ? res.json({ "Carrito eliminado": req.params.id })
    : res.status(404).json({ "Error": -3, "Descripcion": `Producto ${req.params.id} no encontrado` });
});

// Consultar por productos de un carro
carritoRuta.get("/:id/productos", async (req, res) => {
  const carrito = await contenedorCarrito.getById(req.params.id);  // ¿Sería peor o mejor que el carrito tenga un array de IDs de productos?
  carrito
    ? res.json(carrito.productos)
    : res.status(404).json({ "Carrito no encontrado": req.params.id });
});

// Agregar producto a un carro
carritoRuta.post("/:id/productos/:id_prod", async (req, res) => {
  try{
    const {id, id_prod} = req.params;
    const carrito = await contenedorCarrito.getById(id);
    if(!carrito) res.status(404).json({"error": -3, "descripcion": `carrito ${id} no encontrado`});

    const producto = await contenedorProductos.getById(id_prod);
    if (!producto) res.status(404).json({"error": -3, "descripcion": `producto ${id_prod} no encontrado`});

    carrito.productos.push(producto);
    const {acknowledged, modifiedCount} = await contenedorCarrito.updateById(id, carrito);

    (acknowledged && modifiedCount===1)
      ? res.json({ "Producto agregado": producto, "Carrito actualizado": carrito })
      : res.status(404).json({ error: `Carrito ${id} o producto ${id_prod} no encontrado` });
  } catch(e) {
    // Hay una manera con throw new Error() para que el catch reciba el error y lo muestre acá, ojo que es más limpio, lo buscaré después
    console.log(`Ha ocurrido un error: ${e}, probablemente dado por elegir un ID de producto o de carro que no existe`);
  }
});

// Eliminar producto de un carro
carritoRuta.delete("/:id/productos/:id_prod", async (req, res) => {
  const {id, id_prod} = req.params;
  if (!id || !id_prod) {res.status(404).json({"error": -3, "descripcion": `carrito (${id}) o producto (${id_prod}) con un ID que no es un número en alguno de los dos`}); return}

  const carrito = await contenedorCarrito.getById(id);
  if (!carrito) {res.status(404).json({"error": -3, "descripcion": `carrito (${id}) no encontrado`}); return}

  const indice = carrito.productos.findIndex(prod=>prod.id===id_prod);  // Viene como string, por eso el ==
  if (indice === -1) {res.status(404).json({"error": -3, "descripcion": `producto (${id_prod}) no encontrado en el carrito (${id})`}); return}

  const productoEliminado = carrito.productos.splice(indice, 1)[0];
  const {acknowledged, modifiedCount} = await contenedorCarrito.updateById(id, carrito);

  (acknowledged && modifiedCount===1)
    ? res.json({ "Producto eliminado": productoEliminado, "Carrito actualizado": carrito })  // Ojo, que el carrito quedó con un __V, saltándose el .toJSON()
    : res.status(404).json({ error: `Carrito ${id} o producto ${id_prod} no encontrado` });
  // Duda: ¿Cómo anido los if para que no se pasen a lo siguiente? O es mejor usar un return? Porque el response.algo() no corta el callback handler de la petición
});

carritoRuta.use((req, res) => res.status(404).json({ error: -2, descripcion: `ruta api/carrito/${req.path} método ${req.method} no implementada` }));

export default carritoRuta;

//if (require.main === module) console.log("Estoy en carritoRuta.js, es como el if __name__ == __main__ de Python");