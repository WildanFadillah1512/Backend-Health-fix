
import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { getPrograms, getProgram } from '../controllers/programController';

const router = Router();

router.get('/', authenticate, getPrograms);
router.get('/:id', authenticate, getProgram);

export default router;
