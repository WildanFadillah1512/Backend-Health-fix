import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserAchievements = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.uid;

        const unlocked = await prisma.userAchievement.findMany({
            where: { userId },
            include: { achievement: true },
            orderBy: { unlockedAt: 'desc' }
        });

        const allAchievements = await prisma.achievement.findMany();

        const unlockedIds = new Set(unlocked.map(ua => ua.achievementId));
        const locked = allAchievements.filter(a => !unlockedIds.has(a.id));

        res.json({
            unlocked: unlocked.map(ua => ({
                ...ua.achievement,
                unlockedAt: ua.unlockedAt
            })),
            locked,
            totalUnlocked: unlocked.length,
            totalAchievements: allAchievements.length
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch achievements' });
    }
};



export const getAchievementDefinitions = async (req: Request, res: Response) => {
    try {
        const achievements = await prisma.achievement.findMany();
        res.json(achievements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch achievement definitions' });
    }
};

export const checkAndUnlockAchievements = async (userId: string) => {
    try {
        // Get user stats
        const workoutCount = await prisma.completedWorkout.count({
            where: { userId }
        });

        const mealCount = await prisma.meal.count({
            where: { userId }
        });

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { currentStreak: true }
        });

        // Check workout milestones
        const workoutMilestones = [
            { count: 1, achId: 'ach-first-workout' },
            { count: 5, achId: 'ach-5-workouts' },
            { count: 10, achId: 'ach-10-workouts' },
            { count: 20, achId: 'ach-20-workouts' },
            { count: 50, achId: 'ach-50-workouts' }
        ];

        for (const milestone of workoutMilestones) {
            if (workoutCount >= milestone.count) {
                await unlockAchievement(userId, milestone.achId);
            }
        }

        // Check streak achievements
        if (user?.currentStreak && user.currentStreak >= 3) {
            await unlockAchievement(userId, 'ach-3-day-streak');
        }
        if (user?.currentStreak && user.currentStreak >= 7) {
            await unlockAchievement(userId, 'ach-7-day-streak');
        }

        // Check meal achievements
        if (mealCount >= 1) {
            await unlockAchievement(userId, 'ach-first-meal-log');
        }
        if (mealCount >= 30) {
            await unlockAchievement(userId, 'ach-30-meals');
        }

    } catch (error) {
        console.error('Achievement check failed:', error);
    }
};

async function unlockAchievement(userId: string, achievementId: string) {
    try {
        await prisma.userAchievement.upsert({
            where: {
                userId_achievementId: { userId, achievementId }
            },
            update: {},
            create: {
                userId,
                achievementId
            }
        });
    } catch (error) {
        // Achievement already unlocked, ignore
    }
}
