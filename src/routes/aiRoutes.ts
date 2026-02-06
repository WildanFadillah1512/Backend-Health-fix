import express from 'express';
import { chat } from '../controllers/aiController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/chat', authenticate, chat);

export default router;
