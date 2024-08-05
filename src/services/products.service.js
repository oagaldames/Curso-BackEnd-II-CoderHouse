//Servicios para encapsular logicas de negocio y aplicacion de reglas para productos

import ProductManager from "../dao/dbManagers/products.manager.js";

const productManager = new ProductManager();

//Traer todos los productos con o sin  opciones
const getAllProductsService = async (limit, page, sort, category) => {
    let sortResult = {};
    if (sort === "asc" || sort === "desc") {
        sortResult = { price: sort === "asc" ? 1 : -1 };
    }
    const products = await productManager.getAllProducts(
        limit,
        page,
        sortResult,
        category
    );

    return products;
};

//Traer producto por id
const getProductByIdService = async (id) => {
    const productById = await productManager.getProductById(id);
    return productById;
};

//Verificar si existe un producto por codigo
const existingProductService = async (code) => {
    const existingProduct = await productManager.getProductByCode(code);
    return existingProduct;
};

//Agregar un producto nuevo
const addProductService = async (productData, pathThumbnail) => {
    const result = await productManager.addProduct({
        ...productData,
        thumbnail: pathThumbnail,
    });
    return result;
};

//Actualizar un producto existente
const updateProductService = async (idProduct, productData, pathThumbnail) => {
    const updatedProduct = await productManager.updateProduct(
        idProduct,
        productData,
        pathThumbnail
    );
    return updatedProduct;
};

//Eliminar un producto, modifica el campo status:false no lo elimina fisicamente
const deleteProductService = async (id) => {
    const existId = await productManager.getProductById(id);

    if (existId) {
        const deletedProduct = await productManager.deleteProduct(id);

        return deletedProduct;
    }
};

export {
    getAllProductsService,
    getProductByIdService,
    addProductService,
    existingProductService,
    updateProductService,
    deleteProductService,
};
