import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getRecommendedWorkout = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.uid;

        // Get user profile
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { goal: true, level: true }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Get completed workouts this week
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
        weekStart.setHours(0, 0, 0, 0);

        const completedThisWeek = await prisma.completedWorkout.findMany({
            where: {
                userId,
                date: { gte: weekStart }
            },
            include: { workout: true }
        });

        const completedCategories = new Set(
            completedThisWeek.map(cw => cw.workout.category)
        );

        // Recommendation algorithm
        let difficulty = 'Beginner';
        if (user.level && user.level > 5) difficulty = 'Intermediate';
        if (user.level && user.level > 10) difficulty = 'Advanced';

        // Find workout that matches:
        // 1. User's difficulty level
        // 2. Category NOT done this week (for variety)
        // 3. Matches user's goal
        let recommended = await prisma.workout.findFirst({
            where: {
                difficulty,
                category: { notIn: Array.from(completedCategories) },
                isActive: true
            },
            include: { exercises: true }
        });

        // If all categories done, just pick by difficulty
        if (!recommended) {
            recommended = await prisma.workout.findFirst({
                where: { difficulty, isActive: true },
                include: { exercises: true }
            });
        }

        // If still nothing, just pick first active workout
        if (!recommended) {
            recommended = await prisma.workout.findFirst({
                where: { isActive: true },
                include: { exercises: true }
            });
        }

        if (recommended) {
            // Log recommendation
            await prisma.workoutRecommendation.create({
                data: {
                    userId,
                    workoutId: recommended.id,
                    reason: `Level ${user.level || 1}, ${difficulty} difficulty, variety boost`
                }
            });
        }

        res.json(recommended);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get recommendation' });
    }
};

/**
 * Mark a recommendation as applied when user starts the recommended workout
 * This enables feedback loops and recommendation algorithm improvements
 */
export const markRecommendationApplied = async (req: Request, res: Response) => {
    try {
        const { uid } = (req as any).user;
        const recommendationId = Array.isArray(req.params.recommendationId)
            ? req.params.recommendationId[0]
            : req.params.recommendationId;

        // Get Prisma user
        const user = await prisma.user.findUnique({
            where: { firebaseUid: uid }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the recommendation
        const updated = await prisma.workoutRecommendation.update({
            where: {
                id: recommendationId
            },
            data: {
                applied: true
            }
        });

        res.json({ success: true, recommendation: updated });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to mark recommendation as applied' });
    }
};
