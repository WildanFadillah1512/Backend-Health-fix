import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { logWater, getWaterLogs } from '../controllers/waterController';

const router = Router();

router.post('/', authenticate, logWater);
router.get('/', authenticate, getWaterLogs);

export default router;
