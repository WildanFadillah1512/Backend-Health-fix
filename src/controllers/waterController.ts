import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const logWater = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.uid;
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ error: 'Valid amount required' });
        }

        const waterLog = await prisma.waterLog.create({
            data: {
                userId,
                amount: parseInt(amount)
            }
        });

        // Update daily stats
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const dailyStats = await prisma.dailyStats.upsert({
            where: {
                userId_date: {
                    userId,
                    date: today
                }
            },
            update: {
                water: { increment: parseInt(amount) }
            },
            create: {
                userId,
                date: today,
                water: parseInt(amount),
                calories: 0,
                workouts: 0,
                minutes: 0,
                sleep: 0
            }
        });

        res.json({ waterLog, dailyStats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to log water' });
    }
};

export const getWaterLogs = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.uid;
        const { date } = req.query;

        const targetDate = date ? new Date(date as string) : new Date();
        const startOfDay = new Date(targetDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(targetDate);
        endOfDay.setHours(23, 59, 59, 999);

        const logs = await prisma.waterLog.findMany({
            where: {
                userId,
                timestamp: {
                    gte: startOfDay,
                    lte: endOfDay
                }
            },
            orderBy: { timestamp: 'desc' }
        });

        const total = logs.reduce((sum: number, log: any) => sum + log.amount, 0);

        res.json({ logs, total });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch water logs' });
    }
};
