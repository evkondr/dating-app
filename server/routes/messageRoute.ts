import express from 'express';
import MessageController from '../controllers/messageController';
import protectedRoute from '../middleware/protectedRoute';

const router = express.Router();

router.post('/send', protectedRoute, MessageController.sendMessage);

router.get('/conversation/:userId', protectedRoute, MessageController.getConversation);

export default router;
