import { model, Schema } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name of product is required'],
    minLength: [3, 'Product name cannot be less than 3 characters'],
  },
  price: {
    type: String,
    required: [true, 'price is required'],
    min: [1, 'product price cannot be less than 1'],
  },
  stock: {
    type: Number,
    required: [true, 'price is required'],
    min: [0, 'product price cannot be less than 0'],
  },
  category: {
    type: String,
    required: [true, 'category is required'],
    enum: {
      values: ['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Beauty'],
      message: '{VALUE} is not allowed',
    },
  },
});

const Products = model('Products', productSchema);

export default Products;
