import fs from "fs/promises";

class CartManager {
    constructor(filePath) {
        this.path = filePath;
        this.carts = [];
        this.cartIdCounter = 1;
    }

    async loadFileCarts() {
        try {
            const dataCarts = await fs.readFile(this.path, "utf-8");
            this.carts = JSON.parse(dataCarts);
            this.cartIdCounter = this.carts.length + 1;
        } catch (error) {
            this.carts = [];
            this.cartIdCounter = 1;
            const dataCarts = await fs.writeFile(this.path, JSON.stringify(this.carts), "utf-8");
        }
    }

    async saveCart() {
        await fs.writeFile(this.path, JSON.stringify(this.carts), "utf-8");
    }

    async addCart() {

        await this.loadFileCarts();
        const newCart = {
            id: this.cartIdCounter,
            products: [],
        };
        this.carts.push(newCart);
        this.cartIdCounter++;
        await this.saveCart();
        return newCart
    }

    async getCartById(id) {
        try {
            await this.loadFileCarts();
            const cart = this.carts.find((c) => c.id === id);
            if (cart) {
                return {
                    success: true,
                    cart: cart,
                };
            } else {
                return {
                    success: false,
                    mensaje: `No se encontro un Carrito con el Id ${id}`,
                };
            }
        } catch (error) {
            return {
                success: false,
                error: error.message,
            };
        }
    }

    async addProductsToCart(cartId, productId, quantity) {
        try {
            const cart = await this.getCartById(cartId);
            if (cart.success) {
                const indexProduct = cart.cart.products.findIndex(
                    (item) => item.product === productId
                );
                if (indexProduct !== -1) {
                    cart.cart.products[indexProduct].quantity++;
                } else {
                    cart.cart.products.push({
                        product: productId,
                        quantity: quantity || 1,
                    });
                }
                await this.saveCart();
                return cart.cart;
            } else {
                return {
                    success: false,
                    message: `No se encontro un Carrito con el Id ${cartId}`,
                };
            }
        } catch (error) {
            return error.message;
        }
    }
}

export default CartManager;
