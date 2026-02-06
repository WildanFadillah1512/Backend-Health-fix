import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

// Get Notifications
export const getNotifications = async (req: AuthRequest, res: Response) => {
    try {
        const { uid } = req.user!;

        const user = await prisma.user.findUnique({ where: { firebaseUid: uid } });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const notifications = await prisma.notification.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
            take: 20
        });

        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
};

// Mark as Read
export const markRead = async (req: AuthRequest, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        await prisma.notification.update({
            where: { id },
            data: { read: true }
        });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update notification' });
    }
};

// Save Push Token
export const savePushToken = async (req: AuthRequest, res: Response) => {
    try {
        const { token } = req.body;
        const { uid } = req.user!;

        if (!token) {
            return res.status(400).json({ error: 'Token required' });
        }

        const user = await prisma.user.update({
            where: { firebaseUid: uid },
            data: { pushToken: token }
        });

        res.json({ message: 'Push token saved', pushToken: user.pushToken });
    } catch (error) {
        console.error('Save Push Token Error:', error);
        res.status(500).json({ error: 'Failed to save push token' });
    }
};
