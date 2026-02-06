import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { getUserAchievements } from '../controllers/achievementController';

const router = Router();

router.get('/', authenticate, getUserAchievements);

export default router;
