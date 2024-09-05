import express from 'express';
import register from '../controllers/auth/controller.auth.register.js';
import login from '../controllers/auth/controller.auth.login.js';
import logout from '../controllers/auth/controller.auth.logout.js';
import forgotPassword from '../controllers/auth/controller.auth.forgotPassword.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgotpassword', forgotPassword);

export default router;
