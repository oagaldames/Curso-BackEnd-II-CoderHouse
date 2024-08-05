import { cartsModel } from "../dbManagers/models/cart.model.js";

class CartManager {
  constructor() {
    this.carts = [];
  }

  async getCartById(id) {
    const cart = await cartsModel.findOne({ _id: id });
    return cart;
  }

  async addCart(newCart) {
    const result = await cartsModel.create(newCart);
    const cartId = result._id;
    return cartId;
  }

  async addProductsToCart(cart) {
    const updatedCart = await cart.save();
    return updatedCart;
  }

  async deleteProductCart(cid, products) {
    const updatedCart = await cartsModel.updateOne(
      { _id: cid },
      {
        products: products,
      }
    );
    return updatedCart;
  }

  async deleteAllProductsCart(cid, products) {
    const updatedCart = await cartsModel.updateOne(
      { _id: cid },
      {
        products: products,
      }
    );
    return updatedCart;
  }

  async updateProductQuantity(cartId, cart) {
    const updatedCart = await cartsModel.updateOne(
      { _id: cartId },
      { products: cart.products }
    );
    return updatedCart;
  }

  async updateProductsToCart(cartId, products) {
    const updatedCart = await cartsModel.updateOne(
      { _id: cartId },
      {
        products: products,
      }
    );
    return updatedCart;
  }
}

export default CartManager;
