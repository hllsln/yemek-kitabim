import express from 'express';
import getProperties from '../controllers/property/controller.property.get.js';

const router = express.Router();

router.get('/', getProperties);

export default router;
