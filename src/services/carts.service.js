//Servicios para encapsular logicas de negocio y aplicacion de reglas para carritos

import CartManager from "../persistence/dbManagers/carts.repository.js";
import ProductManager from "../persistence/dbManagers/products.repository.js";

const cartManager = new CartManager();
const productManager = new ProductManager();

//Agregar un nuevo carrito
const addCartService = async () => {
    const newCart = {
        products: [],
    };
    const newCartid = await cartManager.addCart(newCart);
    return newCartid;
};

//Traer un carrito por id
const getCartByIdService = async (idcart) => {
    const cartById = await cartManager.getCartById(idcart);
    return cartById;

};

//Agregar un producto a un carrito
const addProductsToCartService = async (cartId, productId) => {
    const cart = await cartManager.getCartById(cartId);
    const products = cart.products;
    const productCart = products.find(item => item.product._id.toString() === productId);

    if (productCart) {
        productCart.quantity++;

    } else {
        cart.products.push({
            product: productId,
            quantity: 1,
        });
    }

    const updateCart = await cartManager.addProductsToCart(cart);
    return updateCart;
}

//Actualizar el campo quantity de un producto en un carrito
const updateProductQuantityService = async (cartId, productId, quantity) => {
    const cart = await cartManager.getCartById(cartId);
    const products = cart.products;
    const productCart = products.find(item => item.product._id.toString() === productId);

    productCart.quantity = Number(quantity);
    const updatedCart = await cartManager.updateProductQuantity(cartId, cart);
    return updatedCart;

};

//Eliminar un producto de un carrito
const deleteProductCartService = async (cid, pid) => {
    const cart = await cartManager.getCartById(cid);

    const products = cart.products;
    const productCart = products.find(item => item.product._id.toString() === pid);
    if (productCart) {
        cart.products.splice(productCart, 1);
    } else {
        return { success: false };
    }
    const updatedCart = await cartManager.deleteProductCart(cid, cart.products);

    if (updatedCart) {
        return true;
    } else {
        return false;
    }
};

//Eliminar todos los productos de un carrito
const deleteAllProductsCartService = async (cid) => {
    const cart = await cartManager.getCartById(cid);
    cart.products.splice(0, cart.products.length);
    const updatedCart = await cartManager.deleteAllProductsCart(
        cid,
        cart.products
    );
    if (updatedCart) {
        return true
    } else {
        return false
    }
};

const purchaseCartService = async (cid) => {
    
    const cart = await cartManager.getCartById(cid);
    let total = 0;
    const productsWithOutStock = [];

    for (const productCart of cart.products) {
        const product = await productManager.getProductById(productCart.product);
        if (product.stock >= productCart.quantity) {
            total += product.price * productCart.quantity;
            await productManager.updateProduct(product._id, {stock: product.stock - productCart.quantity})
        } else {
            productsWithOutStock.push(productCart);
        }

        await cartManager.updateProductsToCart(cid, { products: productsWithOutStock });
    }

    return total;
};



export {
    getCartByIdService,
    addCartService,
    addProductsToCartService,
    updateProductQuantityService,
    deleteProductCartService,
    deleteAllProductsCartService,
    purchaseCartService,
};
