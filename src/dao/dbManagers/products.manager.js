import { productsModel} from "../dbManagers/models/product.model.js"

class ProductManager {
  constructor() {
    this.products = [];
    this.productIdCounter = 1;
  }

  async getProducts() {
      const products = await productsModel.find().lean();
      return products;
  }

  async getAllProducts(limit, page, sort, category) {
    
    const options = {
      page: page,
      limit: limit,
      sort: sort,
      customLabels: {
        docs: "payload",
        totalDocs: "totalProducts",
        page: "currentPage",
      },
    };

    let products = {};

    if (Object.keys(category).length === 0) {
      products = await productsModel.paginate({}, options);
    } else {
      products = await productsModel.paginate({ category }, options);
    }

    return {
      status: "success",
      payload: products.payload,
      totalProducts: products.totalProducts,
      totalPages: products.totalPages,
      currentPage: products.currentPage,
      hasNextPage: products.hasNextPage,
      hasPrevPage: products.hasPrevPage,
    };
  }

  async getProductById(id) {
    const product = await productsModel.findOne({ _id: id });
    return product;
        
    }

  async getProductByCode(code) {
    const product = await productsModel.findOne({ code });
    return product;
  }

  async addProduct(product, pathFile) {
    //try {
      const result = await productsModel.create({
        thumbnail: pathFile,
        ...product,
        status: true,
      });

      return result;
    //} catch (error) {
    //  return error.message;
    //}
  }
  
  async getProductByIdCode(code, id) {
    const existingProduct = await productsModel.findOne({
      code: code,
      _id: { $ne: id },
    });
    
    return existingProduct;
  }

  async updateProduct(id, dataUpdate) {
        const updatedProduct = await productsModel.updateOne(
        { _id: id },
        {
          ...dataUpdate,
          //$push: { thumbnail: { $each: pathFile } },
        }
      );

      return updatedProduct;
    
  }

  async deleteProduct(id) {
    const updatedProduct = await productsModel.updateOne(
      { _id: id },
      {
        status: false,
      }
    );
    return updatedProduct;
  };

}
export default ProductManager;
