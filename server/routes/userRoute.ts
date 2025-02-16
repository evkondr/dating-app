import express from 'express';
import protectedRoute from '../middleware/protectedRoute';
import UserController from '../controllers/userController';
import uploadMiddleware from '../middleware/uploadeMiddleware';

const router = express.Router();

router.post('/update', [protectedRoute, uploadMiddleware.single('file')], UserController.updateProfile);

export default router;
