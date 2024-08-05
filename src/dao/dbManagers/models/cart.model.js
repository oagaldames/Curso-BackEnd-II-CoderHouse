import mongoose from "mongoose";

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

cartSchema.pre(["findOne", "find"], function () {
  this.populate("products.product");
});

export const cartsModel = mongoose.model(cartsCollection, cartSchema);