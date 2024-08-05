//middleware para realizar validacion funciones de productos
import { request, response } from "express";

//funciones a utilizar de servicios de carts
import {getCartByIdService} from "../services/carts.service.js";
//funciones a utilizar de servicios de products
import {getProductByIdService} from "../services/products.service.js";

//Valido que exita el Carrito con el id ingresado
export const chkCartId = async (req = request, res = response, next) => {
    try {
        const idcart = req.params.cid;
        const cartById = await getCartByIdService(idcart);
        if (cartById) {
            req.cartById = idcart;
            next();
        } else {
            return res.status(404).send({
                status: "error", mensaje: `No se encontro un Carrito con el Id ${idcart}`,
            });
        }
    }
    catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
}

//Valido que exita el producto con el id ingresado para agreghar al carrito
export const chkProductId = async (req = request, res = response, next) => {
    try {
        //Valido si existe un producto con el id ingresado
        const idProduct = req.params.pid;
        const productById = await getProductByIdService(idProduct);

        if (productById) {
            next();
        } else {
            return res.status(404).send({ status: "error", error: `El producto con el id ${idProduct} no existe` });
        }
    }
    catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
}