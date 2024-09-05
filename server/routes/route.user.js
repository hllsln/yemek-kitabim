import express from 'express';
import deleteUser from '../controllers/user/controller.user.delete.js';
import getUsers from '../controllers/user/controller.user.get.js';
import saveRecipeToUser from '../controllers/user/controller.user.saveRecipe.js';
import unsaveRecipeFromUser from '../controllers/user/controller.user.unsaveRecipe.js';
import updateUser from '../controllers/user/controller.user.update.js';
import addPreferenceToUser from '../controllers/user/controller.user.addPreference.js';
import upload from '../libs/multer.config.js';

const router = express.Router();

router.get('/', getUsers);
router.delete('/delete', deleteUser);
router.post('/saveRecipe', saveRecipeToUser);
router.post('/unsaveRecipe', unsaveRecipeFromUser);
router.post('/update', upload.single('image'), updateUser);
router.post('/addpref');

export default router;
