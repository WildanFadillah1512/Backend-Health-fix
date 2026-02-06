import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { sendPushNotification } from '../utils/pushNotifications';

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

// Create Notification
export const createNotification = async (req: AuthRequest, res: Response) => {
    try {
        const { uid } = req.user!;
        const { title, message, type = 'info' } = req.body;

        if (!title || !message) {
            return res.status(400).json({ error: 'Title and message required' });
        }

        const user = await prisma.user.findUnique({
            where: { firebaseUid: uid }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create notification in database
        const notification = await prisma.notification.create({
            data: {
                userId: user.id,
                title,
                message,
                type,
                read: false
            }
        });

        // Send push notification if user has token
        if (user.pushToken) {
            try {
                await sendPushNotification(
                    user.pushToken,
                    title,
                    message,
                    { notificationId: notification.id, type }
                );
                console.log(`✅ Push notification sent to user ${user.name}`);
            } catch (error) {
                console.error('❌ Failed to send push notification:', error);
                // Don't fail the request if push fails
            }
        }

        res.json(notification);
    } catch (error) {
        console.error('Create Notification Error:', error);
        res.status(500).json({ error: 'Failed to create notification' });
    }
};
