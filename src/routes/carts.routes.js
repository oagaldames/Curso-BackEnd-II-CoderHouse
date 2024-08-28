import { Router } from "express";

//funciones a utilizar del controlador de carritos
import {
  getCartByIdController,
  addCartController,
  addProductsToCartController,
  updateProductQuantityController,
  deleteProductCartController,
  deleteAllProductsCartController,
  purchaseCartController,
} from "../controllers/carts.controller.js";

//import middlewares
import { chkCartId } from "../middlewares/chkCartData.middleware.js";
import { chkProductId } from "../middlewares/chkProductData.middleware.js";
import { isUserCart } from "../middlewares/chkUserCart.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { passportCall } from "../middlewares/passport.middleware.js";


const router = Router();

//rutas para carts
// ruta para agregar un nuevo carrito
router.post("/", addCartController);

// ruta para obtener un carrito por id
router.get("/:cid", chkCartId,getCartByIdController);

//ruta para agregar un producto al carrito , si el producto existe suma 1 a quantity
router.post("/:cid/product/:pid", 
  passportCall("jwt"),
  authorization("user"),
  isUserCart,
  chkCartId,
  chkProductId,
  addProductsToCartController);

//ruta oara actualizar la cantidad (quantity) de un producto en un carrito ,se pasa el valor quantity por req.body
router.put("/:cid/product/:pid",
  passportCall("jwt"),
  authorization("user"),  
  chkCartId, 
  updateProductQuantityController);

//Ruta para eliminar un producto de un carrito se pasa por parámetro el id del carrito(cid) y el id del producto a eliminar (pid)
router.delete("/:cid/product/:pid", 
  passportCall("jwt"),
  authorization("user"),
  chkCartId,
  deleteProductCartController);

//Ruta para eliminar un producto de un carrito se pasa por parámetro el id del carrito(cid)
router.delete("/:cid", 
  passportCall("jwt"),
  authorization("user"),
  chkCartId,
  deleteAllProductsCartController);

//Ruta para realizar la compra de un carrito
  router.get("/:cid/purchase", 
    passportCall("jwt"), 
    authorization("user"), 
    chkCartId,
    purchaseCartController);


export default router ;