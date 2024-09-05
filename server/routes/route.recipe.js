import express from 'express';
import deleteRecipe from '../controllers/recipe/controller.recipe.delete.js';
import getRecipes from '../controllers/recipe/controller.recipe.get.js';
import searchRecipes from '../controllers/recipe/controller.recipe.search.js';
import postRecipe from '../controllers/recipe/controller.recipe.post.js';
import updateRecipe from '../controllers/recipe/controller.recipe.update.js';
import upload from '../libs/multer.config.js';

const router = express.Router();

router.get('/', getRecipes);
router.delete('/delete', deleteRecipe);
router.post('/search', searchRecipes);
router.post('/post', upload.single('image'), postRecipe);
router.post('/update', upload.single('image'), updateRecipe);

export default router;
