import { Router } from "express";

//funciones a utilizar del controlador de carritos
import {
  getCartByIdController,
  addCartController,
  addProductsToCartController,
  updateProductQuantityController,
  deleteProductCartController,
  deleteAllProductsCartController,
} from "../controllers/carts.controller.js";

//import middlewares
import { chkCartId } from "../middlewares/chkCartData.middleware.js";
import { chkProductId } from "../middlewares/chkProductData.middleware.js";
const router = Router();

//rutas para carts
// ruta para agregar un nuevo carrito
router.post("/", addCartController);

// ruta para obtener un carrito por id
router.get("/:cid", chkCartId,getCartByIdController);

//ruta para agregar un producto al carrito , si el producto existe suma 1 a quantity
router.post("/:cid/product/:pid", chkCartId,chkProductId,addProductsToCartController);

//ruta oara actualizar la cantidad (quantity) de un producto en un carrito ,se pasa el valor quantity por req.body
router.put("/:cid/product/:pid",chkCartId, updateProductQuantityController);

//Ruta para eliminar un producto de un carrito se pasa por parámetro el id del carrito(cid) y el id del producto a eliminar (pid)
router.delete("/:cid/product/:pid", chkCartId,deleteProductCartController);

//Ruta para eliminar un producto de un carrito se pasa por parámetro el id del carrito(cid)
router.delete("/:cid", chkCartId,deleteAllProductsCartController);

export default router ;