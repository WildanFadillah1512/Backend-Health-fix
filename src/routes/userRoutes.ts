import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { syncProfile, getProfile, updateDailyStats, updatePreferences, getDailyStatsHistory } from '../controllers/userController';

const router = Router();

// Protected Routes
router.post('/sync', authenticate, syncProfile);
router.get('/profile', authenticate, getProfile);
router.post('/stats', authenticate, updateDailyStats);
router.get('/stats/history', authenticate, getDailyStatsHistory);
router.put('/preferences', authenticate, updatePreferences);

export default router;
