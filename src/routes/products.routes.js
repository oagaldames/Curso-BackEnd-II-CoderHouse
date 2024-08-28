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

  import { authorization } from "../middlewares/authorization.middleware.js";
  import { passportCall } from "../middlewares/passport.middleware.js";

  const router = Router();
  
  //Ruta para obtener todos los productos 
  router.get("/", getAllProductController);
  
  // Ruta para obtener un producto por ID
  router.get("/:pid", 
    chkProductId,
    getProductIdController);
  
  // Ruta para agregar un nuevo producto
  router.post("/", 
    passportCall("jwt"),
    authorization("admin"),
    chkProductData,
    addProductController);
  
  // Ruta para actualizar un producto por ID
  router.put("/:pid",
    passportCall("jwt"),
    authorization("admin"), 
    chkProductId,
    updateProductController);
  
  // Ruta para eliminar un producto por ID
  router.delete("/:pid",
    passportCall("jwt"),
    authorization("admin"),
    chkProductId, 
    deleteProductController);
  
  export default router ;
  
