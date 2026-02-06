
import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { getPrograms, getProgram, enrollInProgram, getUserEnrollments } from '../controllers/programController';

const router = Router();

router.get('/', authenticate, getPrograms);
router.get('/:id', authenticate, getProgram);
router.post('/enroll', authenticate, enrollInProgram);
router.get('/user/enrollments', authenticate, getUserEnrollments);

export default router;
