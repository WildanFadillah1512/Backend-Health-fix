import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { addMeal, getMeals } from '../controllers/mealController';

const router = Router();

router.post('/', authenticate, addMeal);
router.get('/', authenticate, getMeals);

export default router;
