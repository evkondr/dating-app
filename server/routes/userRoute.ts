import express from 'express';
import protectedRoute from '../middleware/protectedRoute';

const router = express.Router();

router.get('/', protectedRoute, (req:any, res:any) => {
  res.send(req.user)
})

export default router;
