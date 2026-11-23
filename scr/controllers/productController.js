import Products from '../models/productModel.js';
import { addProduct, getProduct } from '../services/productServices.js';

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Products.find();

    res.status(200).json({
      results: allProducts.length,
      status: 'success',
      message: 'All products fetched successfully',
      data: {
        products: allProducts,
      },
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ status: 'error', message: error.message });
  }
};

export const getProductByName = async (req, res) => {
  try {
    const name = req.params.name;

    const product = await getProduct(name);

    res.status(200).json({
      status: 'success',
      message: 'Product fetched successfully',
      data: {
        product,
      },
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ status: 'error', message: error.message });
  }
};

export const createProduct = async (req, res) => {

  try {
    const productData = req.body;
    const pData = await addProduct(productData);

    res.status(201).json({ message: "Product created succesfully", "product": pData })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
};
