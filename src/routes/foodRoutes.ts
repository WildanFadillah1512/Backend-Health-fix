import express from 'express';
import { getFoods, searchFoods, createCustomFood, getUserFoods } from '../controllers/foodController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticate, getFoods);
router.get('/search', authenticate, searchFoods);
router.post('/custom', authenticate, createCustomFood);
router.get('/my-foods', authenticate, getUserFoods);

export default router;
