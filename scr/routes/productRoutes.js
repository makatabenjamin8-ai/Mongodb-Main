import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  getProductByName,
} from '../controllers/productController.js';

const router = Router();

router.get('/', getAllProducts);

router.get('/:name', getProductByName);

router.post('/', createProduct);

export default router;
