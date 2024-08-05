import fs from "fs/promises";

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.productIdCounter = 1;
    }

    async loadFileProducts() {

        try {
            const dataProducts = await fs.readFile(this.path, "utf-8");
            this.products = JSON.parse(dataProducts);
            this.productIdCounter = this.products.length + 1;
            return this.products;
        } catch (error) {
            this.products = [];
            this.productsIdCounter = 1;
            const dataProducts = await fs.writeFile(this.path, JSON.stringify(this.products), "utf-8");
        }
    }

    async saveFileProducts() {
        await fs.writeFile(this.path, JSON.stringify(this.products), "utf-8");
    }

    async addProduct(product) {
        try {
            await this.loadFileProducts();
            console.log(product);
            const { title, description, price, thumbnail, code, stock, category } = product;

            const newProduct = {

                id: this.productIdCounter,
                title,
                description,
                price,
                code,
                stock,
                category,
                status: true,
                thumbnail: thumbnail || [],
            };
            this.products.push(newProduct);
            this.productIdCounter++;
            await this.saveFileProducts();
            return newProduct;
        } catch (error) {
            return error.message;
        }
    }

    async getProducts() {
        try {
            await this.loadFileProducts();
            return this.products;
        } catch (error) {
            return error.message;
        }
    }

    async getProductById(id) {
        try {
            await this.loadFileProducts();
            const product = this.products.find((p) => p.id === id);
            return product;
        } catch (error) {
            return null;
        }
    }

    async updateProduct(id, dataUpdate) {
        try {
            await this.loadFileProducts();
            try {
                const productIndex = this.products.findIndex(
                    (product) => product.id === id
                );
                this.products[productIndex] = {
                    ...this.products[productIndex],
                    ...dataUpdate,
                    id: id,
                };
                await this.saveFileProducts();
                const product = await this.getProductById(id);
                return product;

            } catch (error) {
                return error.message;
            }
        } catch (error) {
            return error.message;
        }
    }

    async deleteProduct(id) {
        try {
            await this.loadFileProducts();
                const productIndex = this.products.findIndex(
                    (product) => product.id === id
                );
                if (productIndex !== -1) {
                    const deleteProduct = this.products.splice(productIndex, 1)[0];
                    await this.saveFileProducts();
                    return true;
                    
                } else {
                    return false;
                }
        } catch (error) {
            return error.message;
        }
    }
}

export default ProductManager;