
import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { getRecipes, getRecipe } from '../controllers/recipeController';

const router = Router();

router.get('/', authenticate, getRecipes);
router.get('/:id', authenticate, getRecipe);

export default router;
