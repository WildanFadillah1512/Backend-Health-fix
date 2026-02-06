import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { getWorkouts, getWorkoutById, completeWorkout } from '../controllers/workoutController';
import { getRecommendedWorkout, markRecommendationApplied } from '../controllers/recommendationController';

const router = Router();

router.get('/', authenticate, getWorkouts);
router.get('/:id', authenticate, getWorkoutById);
router.post('/complete', authenticate, completeWorkout);
router.get('/recommended', authenticate, getRecommendedWorkout);
router.post('/recommendations/:recommendationId/apply', authenticate, markRecommendationApplied);

export default router;
