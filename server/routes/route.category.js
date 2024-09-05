import express from 'express';
import getCategories from '../controllers/category/controller.category.get.js';

const router = express.Router();

router.get('/', getCategories);

export default router;
