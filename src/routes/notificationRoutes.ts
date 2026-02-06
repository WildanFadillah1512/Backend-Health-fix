import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { getNotifications, markRead, savePushToken, createNotification } from '../controllers/notificationController';

const router = Router();

router.get('/', authenticate, getNotifications);
router.post('/', authenticate, createNotification);
router.put('/:id/read', authenticate, markRead);
router.post('/push-token', authenticate, savePushToken);

export default router;
