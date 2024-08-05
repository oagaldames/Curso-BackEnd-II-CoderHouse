import { Router } from "express";

//funciones a utilizar del controlador de productos
import {
    getAllProductController,
    getProductIdController,
    addProductController,
    updateProductController,
    deleteProductController,
  } from "../controllers/products.controller.js";
  
  import { chkProductId ,chkProductData} from "../middlewares/chkProductData.middleware.js";

  const router = Router();
  
  //Ruta para obtener todos los productos 
  router.get("/", getAllProductController);
  
  // Ruta para obtener un producto por ID
  router.get("/:pid", chkProductId,getProductIdController);
  
  // Ruta para agregar un nuevo producto
  router.post("/", chkProductData,addProductController);
  
  // Ruta para actualizar un producto por ID
  router.put("/:pid", chkProductId,updateProductController);
  
  // Ruta para eliminar un producto por ID
  router.delete("/:pid",chkProductId, deleteProductController);
  
  export default router ;
  
