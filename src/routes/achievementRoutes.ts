import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { getUserAchievements, getAchievementDefinitions } from '../controllers/achievementController';

const router = Router();

router.get('/', authenticate, getUserAchievements);
router.get('/definitions', authenticate, getAchievementDefinitions);

export default router;
