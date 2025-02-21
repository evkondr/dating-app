import express from 'express';
import MessageController from '../controllers/messageController';

const router = express.Router();

router.post('/send', MessageController.sendMessage);

router.get('/conversation/:userId', MessageController.getConversation);

export default router;
