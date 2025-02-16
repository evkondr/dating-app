import express from 'express';
import protectedRoute from '../middleware/protectedRoute';
import MatchController from '../controllers/matchController';

const router = express.Router();

router.post('/swipe-right', protectedRoute, MatchController.swipeRight);
router.post('/swipe-left', protectedRoute, MatchController.swipeLeft);

router.get('/', protectedRoute, MatchController.getMatches);
router.get('/user-profiles', protectedRoute, MatchController.userProfiles);

export default router;
