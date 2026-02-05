import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { syncProfile, getProfile } from '../controllers/userController';

const router = Router();

// Protected Routes
router.post('/sync', authenticate, syncProfile);
router.get('/profile', authenticate, getProfile);

export default router;
