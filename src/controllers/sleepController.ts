import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const logSleep = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.uid;
        const { sleepTime, wakeTime, quality, interruptions, notes } = req.body;

        if (!sleepTime || !wakeTime) {
            return res.status(400).json({ error: 'Sleep and wake times required' });
        }

        const sleep = new Date(sleepTime);
        const wake = new Date(wakeTime);
        const totalHours = (wake.getTime() - sleep.getTime()) / (1000 * 60 * 60);

        const sleepLog = await prisma.sleepLog.create({
            data: {
                userId,
                sleepTime: sleep,
                wakeTime: wake,
                totalHours,
                quality: quality || 'fair',
                interruptions: interruptions ? parseInt(interruptions) : null,
                notes: notes || null
            }
        });

        // Update daily stats
        const dateOfSleep = new Date(sleep);
        dateOfSleep.setHours(0, 0, 0, 0);

        await prisma.dailyStats.upsert({
            where: {
                userId_date: {
                    userId,
                    date: dateOfSleep
                }
            },
            update: {
                sleep: totalHours
            },
            create: {
                userId,
                date: dateOfSleep,
                sleep: totalHours,
                calories: 0,
                workouts: 0,
                minutes: 0,
                water: 0
            }
        });

        res.json(sleepLog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to log sleep' });
    }
};

export const getSleepLogs = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.uid;
        const { limit = 30 } = req.query;

        const logs = await prisma.sleepLog.findMany({
            where: { userId },
            orderBy: { sleepTime: 'desc' },
            take: parseInt(limit as string)
        });

        res.json(logs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch sleep logs' });
    }
};
