import express from 'express';
import { AuthController } from '../controllers/authController';
import protectedRoute from '../middleware/protectedRoute';

const router = express.Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

router.get('/check', protectedRoute, AuthController.checkAuth);


export default router;
