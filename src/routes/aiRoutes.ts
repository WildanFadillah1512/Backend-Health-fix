import express from 'express';
import { chat, syncChat } from '../controllers/aiController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/chat', authenticate, chat);
router.post('/chat/sync', authenticate, syncChat);

export default router;
