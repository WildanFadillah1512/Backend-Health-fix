import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { updateUserStreak } from '../utils/streakCalculator';

const prisma = new PrismaClient();

// Get list of all workouts
export const getWorkouts = async (req: AuthRequest, res: Response) => {
    try {
        const { category, difficulty } = req.query;

        const workouts = await prisma.workout.findMany({
            where: {
                isActive: true,
                ...(category && { category: category as string }),
                ...(difficulty && { difficulty: difficulty as string })
            },
            include: {
                exercises: {
                    orderBy: { order: 'asc' }
                }
            }
        });

        res.json(workouts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
};

// Get single workout by ID
export const getWorkoutById = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        const workout = await prisma.workout.findUnique({
            where: { id },
            include: {
                exercises: {
                    orderBy: { order: 'asc' }
                }
            }
        });

        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }

        res.json(workout);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch workout' });
    }
};

// Complete workout and update user XP/level
export const completeWorkout = async (req: AuthRequest, res: Response) => {
    try {
        const { uid } = (req as any).user;
        const { workoutId, duration, calories } = req.body;

        // Get Prisma user
        const user = await prisma.user.findUnique({ where: { firebaseUid: uid } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Log workout completion
        const completedWorkout = await prisma.completedWorkout.create({
            data: {
                userId: user.id,
                workoutId,
                duration: duration || 0,
                calories: calories || 0
            }
        });

        // Calculate XP gained (base: calories burned / 10)
        const xpGained = Math.floor((calories || 100) / 10);
        const newXP = (user.xp || 0) + xpGained;

        // Simple level calculation (every 1000 XP = 1 level)
        const newLevel = Math.floor(newXP / 1000) + 1;

        // Update user stats
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                xp: newXP,
                level: newLevel
            }
        });

        // Calculate and update streak
        const currentStreak = await updateUserStreak(user.id);
        console.log(`🔥 User streak updated: ${currentStreak} days`);

        // Update daily stats
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        await prisma.dailyStats.upsert({
            where: {
                userId_date: {
                    userId: user.id,
                    date: today
                }
            },
            update: {
                workouts: { increment: 1 },
                calories: { increment: calories || 0 },
                minutes: { increment: duration || 0 }
            },
            create: {
                userId: user.id,
                date: today,
                workouts: 1,
                calories: calories || 0,
                minutes: duration || 0,
                water: 0,
                sleep: 0
            }
        });

        res.json({
            completedWorkout,
            user: updatedUser,
            xpGained,
            levelUp: newLevel > (user.level || 1),
            currentStreak
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to complete workout' });
    }
};
