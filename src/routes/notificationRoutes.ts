import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { getNotifications, markRead, savePushToken } from '../controllers/notificationController';

const router = Router();

router.get('/', authenticate, getNotifications);
router.put('/:id/read', authenticate, markRead);
router.post('/push-token', authenticate, savePushToken);

export default router;
