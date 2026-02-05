import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { getNotifications, markRead } from '../controllers/notificationController';

const router = Router();

router.get('/', authenticate, getNotifications);
router.put('/:id/read', authenticate, markRead);

export default router;
