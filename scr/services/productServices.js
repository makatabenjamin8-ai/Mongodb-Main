import Products from "../models/productModel.js";

export const addProduct = async (productData) => {
    return await Products.create(productData);
}

export const getProduct = async (name) => {
    return await Products.findOne({ name });
}