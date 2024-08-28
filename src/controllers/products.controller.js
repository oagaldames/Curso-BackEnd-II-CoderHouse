// Controlador para manejar solicitudes entrantes y coordinar lógica de negocio para productos

//funciones a utilizar de servicios de productos
import {
    getAllProductsService,
    getProductByIdService,
    addProductService,
    existingProductService,
    updateProductService,
    deleteProductService,
} from "../services/products.service.js";

//Función para traer todos los productos
const getAllProductController = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort || null;
        const category = req.query.category || {};

        const products = await getAllProductsService(limit, page, sort, category);
        res.send({ status: "success", payload: products });
    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
};

//Función para traer un producto por id
const getProductIdController = async (req, res) => {
    try {
        const idProduct = req.productById;
        const productById = await getProductByIdService(idProduct);
        res.status(200).send({ status: "success", productById });
    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
};

//Función para agregar un nuevo producto
const addProductController = async (req, res, next) => {
    try {
        let pathThumbnail = [];

        const productData = req.body;
        const result = await addProductService({
            ...productData,
            thumbnail: pathThumbnail,
        });
        res.status(201).send({
            message: "Producto creado correctamente",
            product: result,
        });
    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
};

//Función para actualizar un producto existente
const updateProductController = async (req, res, next) => {
    let pathThumbnail = [];
    try {

        const idProduct = req.params.pid;
        const productData = req.body;
        const updatedProduct = await updateProductService(
            idProduct,
            productData,
            pathThumbnail
        );
        if (updatedProduct) {
            res.status(200).send({
                status: "success",
                message: `El producto con Id= ${idProduct}  se ha Modificado correctamente.`,
                updatedProduct,
            });
        } else {
            res.status(400).json({ error: updatedProduct });
        }
    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor", error });
    }
};

//Función para eliminar un producto existente , pone status:false no lo borra
const deleteProductController = async (req, res) => {
    try {
        const idProduct = req.params.pid;

        const deletedProduct = await deleteProductService(idProduct);
        if (deletedProduct) {
            res.status(200).send({
                status: "success",
                message: `El producto con Id= ${idProduct}  se ha Eliminado correctamente.`,
            });
        } else {
            res.status(409).send({ error: deletedProduct });
        }
    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
};

export {
    getAllProductController,
    getProductIdController,
    addProductController,
    updateProductController,
    deleteProductController,
};
