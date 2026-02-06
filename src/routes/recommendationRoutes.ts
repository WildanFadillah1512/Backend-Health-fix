import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { getRecommendedWorkout } from '../controllers/recommendationController';

const router = Router();

router.get('/workout', authenticate, getRecommendedWorkout);

export default router;
