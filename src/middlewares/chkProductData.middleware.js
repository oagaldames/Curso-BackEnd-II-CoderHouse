//middleware para realizar validacion funciones de productos
import { request, response } from "express";
import {
     getProductByIdService,
     existingProductService,
} from "../services/products.service.js";

//Valido que exita el producto con el id ingresado
export const chkProductId = async (req = request, res = response, next) => {
     try {
          //Valido si existe un producto con el id ingresado
          const idProduct = req.params.pid;
          const productById = await getProductByIdService(idProduct);

          if (productById) {
               req.productById = productById;
               next();
          } else {
               return res.status(404).send({ status: "error", error: `El producto con el id ${idProduct} no existe` });
          }

     }
     catch (error) {
          res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
     }
}
//Valido que exita el producto con el id ingresado
export const chkProductData = async (req = request, res = response, next) => {

     try {

          const productData = req.body;
          if (
               !productData.title ||
               !productData.description ||
               !productData.code ||
               !productData.price ||
               !productData.stock ||
               !productData.category
          ) {
               return res.status(400).json({ status: "Error", msg: "Faltan campos obligatorios" });
          }
          //valido que no esxita un producto con el mismo codigo ingresado
          const existingProduct = await existingProductService(productData.code);
          if (existingProduct) {
               return res.status(400).json({ status: "Error", msg: `El producto con el código ${productData.code} ya existe` });
          }
          next();
     } catch (error) {
          res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
     }
}
