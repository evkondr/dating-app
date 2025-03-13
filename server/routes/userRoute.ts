import express from 'express';
import protectedRoute from '../middleware/protectedRoute';
import UserController from '../controllers/userController';
import uploadMiddleware from '../middleware/uploadMiddleware';

const router = express.Router();

router.put('/update', [protectedRoute, uploadMiddleware.single('image')], UserController.updateProfile);

export default router;
