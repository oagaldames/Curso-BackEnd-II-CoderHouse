import { Router } from "express";
import ProductManager from "../dao/fileManagers/models/ProductManager.js";
const productManager = new ProductManager("./data/products.json");
import { io } from "../app.js";
const viewsRouter = Router();

viewsRouter.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("home", { products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    io.emit("dataUpdated", products);
    res.render("realTimeProducts");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

viewsRouter.post("/realtimeproducts", async (req, res) => {
  try {
    const { title, description, code, price, stock, category } = req.body;
    await productManager.addProduct({
      title,
      description,
      code,
      price,
      stock,
      category,
    });
    const products = await productManager.getProducts();
    io.emit("dataUpdated", products);
    res.render("realTimeProducts");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

viewsRouter.delete("/realtimeproducts", async (req, res) => {
  try {
    const { pid } = req.body;
    await productManager.deleteProduct(Number(pid));
    const products = await productManager.getProducts();
    io.emit("dataUpdated", products);
    res.render("realTimeProducts");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default viewsRouter;
