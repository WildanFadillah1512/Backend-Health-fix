import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { logMeasurement, getMeasurementHistory, logPhoto, getPhotos } from '../controllers/measurementController';

const router = Router();

router.post('/log', authenticate, logMeasurement);
router.get('/history', authenticate, getMeasurementHistory);
router.post('/photos', authenticate, logPhoto);
router.get('/photos', authenticate, getPhotos);

export default router;
