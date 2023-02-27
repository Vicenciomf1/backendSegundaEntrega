import { Router } from "express";
import Producto from "../daos/mongo/product.js";
import authMiddleware from "../utils/authMiddleware.js";

const productosRuta = Router();
export const contenedorProductos = new Producto();

productosRuta.get("/", async (req, res) => {
  const productos = await contenedorProductos.getAll();  // ¿Cómo lo hago más robusto?
  res.json(productos);
});

productosRuta.get("/:id", async (req, res) => {
  const producto = await contenedorProductos.getById(req.params.id);

  producto
    ? res.json(producto)
    : res.status(404).json({"Error": -3, "Descripcion": "Producto no encontrado"});
});

// Revisar
productosRuta.post("/", authMiddleware, async (req, res) => {
  const producto = req.body;
  const id = await contenedorProductos.save(producto);
  res.status(201).json({ "status": "ok",  id }); // Si quiero que retorne el id hago esto, si quiero que retorne el producto, hago un .toJSON() en el modelo
});

productosRuta.put("/:id", authMiddleware, async (req, res) => {
  //if (!id) res.status(404).json({"error": -3, "descripcion": "producto no encontrado, o usaste un ID que no es un número"});

  const producto = req.body;
  const {acknowledged, modifiedCount} = await contenedorProductos.updateById(req.params.id, producto);

  (acknowledged && modifiedCount===1)
    ? res.json({ "Producto actualizado": producto, "ID del producto actualizado": req.params.id })
    : res.status(404).json({ "Error": -3, "Descripcion": `Producto ${req.params.id} no encontrado` });
});

productosRuta.delete("/:id", authMiddleware, async (req, res) => {
  const {acknowledged, deletedCount} = await contenedorProductos.deleteById(req.params.id);

  (acknowledged && deletedCount===1)
    ? res.json({ "Producto eliminado": req.params.id })
    : res.status(404).json({ "Error": -3, "Descripcion": `Producto ${req.params.id} no encontrado` });
});


productosRuta.use((req, res) => res.status(404).json({ "error": -2, "descripcion": `ruta api/productos${req.path} método ${req.method} no implementada` }));

export default productosRuta;