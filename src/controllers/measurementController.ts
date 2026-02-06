import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Log Body Measurement
export const logMeasurement = async (req: AuthRequest, res: Response) => {
    try {
        const { weight, chest, waist, hips, arms, thighs, bodyFat, date } = req.body;
        const { uid } = req.user!;

        const user = await prisma.user.findUnique({ where: { firebaseUid: uid } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const logDate = date ? new Date(date) : new Date();

        const measurement = await prisma.bodyMeasurement.create({
            data: {
                userId: user.id,
                date: logDate,
                weight: parseFloat(weight),
                chest: chest ? parseFloat(chest) : null,
                waist: waist ? parseFloat(waist) : null,
                hips: hips ? parseFloat(hips) : null,
                arms: arms ? parseFloat(arms) : null,
                thighs: thighs ? parseFloat(thighs) : null,
                bodyFat: bodyFat ? parseFloat(bodyFat) : null,
            }
        });

        // Update current weight in user profile if newer
        if (date === undefined || new Date(date).getTime() >= new Date(user.updatedAt).getTime()) {
            await prisma.user.update({
                where: { id: user.id },
                data: { weight: parseFloat(weight) }
            });
        }

        res.json(measurement);
    } catch (error) {
        console.error('Log Measurement Error:', error);
        res.status(500).json({ error: 'Failed to log measurement' });
    }
};

// Get Measurement History
export const getMeasurementHistory = async (req: AuthRequest, res: Response) => {
    try {
        const { uid } = req.user!;
        const user = await prisma.user.findUnique({ where: { firebaseUid: uid } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const history = await prisma.bodyMeasurement.findMany({
            where: { userId: user.id },
            orderBy: { date: 'asc' } // Oldest first for charts
        });

        res.json(history);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch history' });
    }
};

// Log Progress Photo
export const logPhoto = async (req: AuthRequest, res: Response) => {
    try {
        const { photoUrl, notes, date } = req.body;
        const { uid } = req.user!;
        const user = await prisma.user.findUnique({ where: { firebaseUid: uid } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const video = await prisma.progressPhoto.create({
            data: {
                userId: user.id,
                photoUrl,
                notes,
                date: date ? new Date(date) : new Date()
            }
        });
        res.json(video);
    } catch (e) {
        res.status(500).json({ error: 'Failed to log photo' });
    }
};

export const getPhotos = async (req: AuthRequest, res: Response) => {
    try {
        const { uid } = req.user!;
        const user = await prisma.user.findUnique({ where: { firebaseUid: uid } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const photos = await prisma.progressPhoto.findMany({
            where: { userId: user.id },
            orderBy: { date: 'desc' }
        });
        res.json(photos);
    } catch (e) {
        res.status(500).json({ error: 'Failed to fetch photos' });
    }
};
