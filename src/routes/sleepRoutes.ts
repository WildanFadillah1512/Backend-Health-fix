import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { logSleep, getSleepLogs } from '../controllers/sleepController';

const router = Router();

router.post('/', authenticate, logSleep);
router.get('/', authenticate, getSleepLogs);

export default router;
