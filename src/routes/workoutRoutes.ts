import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { getWorkouts, getWorkoutById, completeWorkout } from '../controllers/workoutController';

const router = Router();

router.get('/', authenticate, getWorkouts);
router.get('/:id', authenticate, getWorkoutById);
router.post('/complete', authenticate, completeWorkout);

export default router;
