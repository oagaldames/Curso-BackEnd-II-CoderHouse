// Controlador para manejar solicitudes entrantes y coordinar lógica de negocio para Carritos

//funciones a utilizar de servicios de carts
import {
    getCartByIdService,
    addProductsToCartService,
    addCartService,
    updateProductQuantityService,
    deleteProductCartService,
    deleteAllProductsCartService,
} from "../services/carts.service.js";

import ProductManager from "../dao/dbManagers/products.manager.js";
const productManager = new ProductManager();

//Función para agregar un nuevo carrito
const addCartController = async (req, res) => {
    try {
        const newCart = await addCartService();
        if (newCart) {
            res.status(201).send({ status: "success", Result: newCart });
        } else {
            res.status(400).send({ status: "error", message: newCart });
        }
    } catch (error) {
        res.status(500).send({ message: "Error", error: error.message });
    }
};

//Función para traer un carrito por id
const getCartByIdController = async (req, res) => {
    try {
        const idcart = req.cartById;
        const cartById = await getCartByIdService(idcart);
        if (cartById) {
            res.status(200).send({ status: "success", Result: cartById });
        }
    } catch (error) {
        res.status(500).send({ status: "Error", error: error.message });
    }
};

//Función para agregar un producto a un carrito
const addProductsToCartController = async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const cart = await addProductsToCartService(cid, pid);

        if (cart) {
            res.status(200).send({ status: "success", Result: cart });
        } else {
            res.status(400).send({ status: "Error", message: cart });
        }
    } catch (error) {
        res.status(500).send({ status: "Error", error: error.message });
    }
};

//Función actualizar el campo quantity de un producto en un carrito
const updateProductQuantityController = async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity;
        const cartById = await getCartByIdService(cid);
        const products = cartById.products;
        const productCart = products.find(item => item.product._id.toString() === pid);
        if (!productCart) {
            return res.status(404).send({ status: "error", error: `El producto con el id ${pid} no existe en el carrito` });
        }
        const cart = await updateProductQuantityService(cid, pid, quantity);
        if (cart) {
            res.status(200).send({
                status: "success", message: `Se actualizó la cantidad del producto con el ID ${pid} correctamente`,
                cart,
            });
        } else {
            res.status(400).send({ status: "Error", message: `No se pudo actualizar la cantidad del producto con el ID ${pid}`, });
        }
    } catch (error) {
        res.status(500).send({ status: "Error", error: error.message });
    }
};

//Función para eliminar un producto de un carrito
const deleteProductCartController = async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;

        const deletedProductCart = await deleteProductCartService(cid, pid);
        if (deletedProductCart === true) {
            res.status(200).send({
                status: "success",
                message: `El producto con Id= ${pid}  se ha Eliminado correctamente.`,
            });
        } else {
            res.status(409).send({ error: "El Producto del Carrito no se pudo eliminar" });
        }
    } catch (error) {
        res.status(500).send({ status: "Error", error: error.message });
    }
};

//Función para eliminar todos los productos de un carrito
const deleteAllProductsCartController = async (req, res) => {
    try {
        const cid = req.params.cid;
        const deletedProductsCart = await deleteAllProductsCartService(cid);
        if (deletedProductsCart === true) {
            res.status(200).send({
                status: "success",
                message: `Los Productos del carrito con Id= ${cid}  se han Eliminado correctamente.`,
            });
        } else {
            res.status(409).send({ message: "No se pudo actualizar el carrito en la base de datos", });
        }
    } catch (error) {
        res.status(500).send({ status: "Error", error: error.message });
    }
};

export {
    addCartController,
    getCartByIdController,
    addProductsToCartController,
    updateProductQuantityController,
    deleteProductCartController,
    deleteAllProductsCartController,
};
