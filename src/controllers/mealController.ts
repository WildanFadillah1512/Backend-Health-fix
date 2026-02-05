import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

// Add Meal
export const addMeal = async (req: AuthRequest, res: Response) => {
    try {
        const { uid } = req.user!;
        const { name, calories, protein, carbs, fat, time, image } = req.body;

        const user = await prisma.user.findUnique({ where: { firebaseUid: uid } });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const mealTime = new Date(time);

        // 1. Create Meal
        const meal = await prisma.meal.create({
            data: {
                userId: user.id,
                name,
                calories,
                protein,
                carbs,
                fat,
                time: mealTime,
                image,
                syncedAt: new Date()
            }
        });

        // 2. Update Daily Stats (Aggregated)
        const dateKey = new Date(mealTime);
        dateKey.setHours(0, 0, 0, 0);

        const stats = await prisma.dailyStats.upsert({
            where: {
                userId_date: { userId: user.id, date: dateKey }
            },
            update: {
                calories: { increment: calories }
            },
            create: {
                userId: user.id,
                date: dateKey,
                calories,
                minutes: 0,
                workouts: 0
            }
        });

        res.json({ meal, stats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add meal' });
    }
};

// Get Meals for a Date
export const getMeals = async (req: AuthRequest, res: Response) => {
    try {
        const { uid } = req.user!;
        const { date } = req.query; // '2026-02-05'

        const user = await prisma.user.findUnique({ where: { firebaseUid: uid } });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const startDate = new Date(date as string);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(startDate);
        endDate.setHours(23, 59, 59, 999);

        const meals = await prisma.meal.findMany({
            where: {
                userId: user.id,
                time: {
                    gte: startDate,
                    lte: endDate
                }
            },
            orderBy: { time: 'desc' }
        });

        res.json(meals);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch meals' });
    }
};
