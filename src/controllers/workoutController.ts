import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

// Get All Workouts
export const getWorkouts = async (req: AuthRequest, res: Response) => {
    try {
        const workouts = await prisma.workout.findMany({
            where: { isActive: true },
            include: { exercises: true }
        });
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
};

// Get Workout by ID
export const getWorkoutById = async (req: AuthRequest, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const workout = await prisma.workout.findUnique({
            where: { id },
            include: { exercises: { orderBy: { order: 'asc' } } }
        });

        if (!workout) {
            res.status(404).json({ error: 'Workout not found' });
            return;
        }

        res.json(workout);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch workout' });
    }
};

// Complete Workout
export const completeWorkout = async (req: AuthRequest, res: Response) => {
    try {
        const { uid } = req.user!;
        const { workoutId, duration, calories } = req.body;

        // Get user ID from firebase UID
        const user = await prisma.user.findUnique({ where: { firebaseUid: uid } });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        // 1. Record completed workout
        const completed = await prisma.completedWorkout.create({
            data: {
                userId: user.id,
                workoutId,
                duration,
                calories
            }
        });

        // 2. Update Daily Stats
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const stats = await prisma.dailyStats.upsert({
            where: {
                userId_date: { userId: user.id, date: today }
            },
            update: {
                calories: { increment: calories },
                minutes: { increment: Math.round(duration / 60) },
                workouts: { increment: 1 }
            },
            create: {
                userId: user.id,
                date: today,
                calories,
                minutes: Math.round(duration / 60),
                workouts: 1
            }
        });

        // 3. Update User XP & Level (Gamification)
        const xpGained = 100 + Math.floor(calories / 10); // Base 100XP + 1XP per 10 cal

        // Simple levelup logic: Level = sqrt(XP / 100)
        const newTotalXP = user.xp + xpGained;
        const newLevel = Math.floor(Math.sqrt(newTotalXP / 100)) + 1;

        await prisma.user.update({
            where: { id: user.id },
            data: {
                xp: newTotalXP,
                level: newLevel
            }
        });

        res.json({ completed, stats, xpGained, newLevel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to complete workout' });
    }
};
