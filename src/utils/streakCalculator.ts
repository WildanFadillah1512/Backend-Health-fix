/**
 * Streak calculation utility for tracking consecutive workout days
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Calculate current workout streak for a user
 * A streak is maintained if the user completes at least one workout per day
 * @param userId - Prisma user ID
 * @returns Current streak in days
 */
export async function calculateWorkoutStreak(userId: string): Promise<number> {
    // Get all completed workouts ordered by date (most recent first)
    const completedWorkouts = await prisma.completedWorkout.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
        select: { date: true }
    });

    if (completedWorkouts.length === 0) {
        return 0;
    }

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Start of today

    // Check if there's a workout today or yesterday (grace period)
    const latestWorkout = completedWorkouts[0].date;
    const latestWorkoutDate = new Date(latestWorkout);
    latestWorkoutDate.setHours(0, 0, 0, 0);

    const daysDiff = Math.floor((currentDate.getTime() - latestWorkoutDate.getTime()) / (1000 * 60 * 60 * 24));

    // Streak is broken if last workout was more than 1 day ago
    if (daysDiff > 1) {
        return 0;
    }

    // Group workouts by date
    const workoutsByDate = new Map<string, number>();
    for (const workout of completedWorkouts) {
        const date = new Date(workout.date);
        date.setHours(0, 0, 0, 0);
        const dateKey = date.toISOString().split('T')[0];
        workoutsByDate.set(dateKey, (workoutsByDate.get(dateKey) || 0) + 1);
    }

    // Calculate streak by checking consecutive days
    let checkDate = new Date(currentDate);

    while (true) {
        const dateKey = checkDate.toISOString().split('T')[0];

        if (workoutsByDate.has(dateKey)) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1); // Go back one day
        } else {
            break; // Streak broken
        }
    }

    return streak;
}

/**
 * Check and update user's streak achievement
 * Awards achievements for 3, 7, 14, 30, 60, 100 day streaks
 */
export async function checkStreakAchievements(userId: string, streak: number): Promise<void> {
    const streakMilestones = [
        { days: 3, title: 'Consistency King' },
        { days: 7, title: 'Week Warrior' },
        { days: 14, title: 'Fortnight Fighter' },
        { days: 30, title: 'Monthly Master' },
        { days: 60, title: 'Unstoppable' },
        { days: 100, title: 'Beast Mode' }
    ];

    for (const milestone of streakMilestones) {
        if (streak >= milestone.days) {
            // Check if achievement exists
            const achievement = await prisma.achievement.findFirst({
                where: { title: milestone.title }
            });

            if (achievement) {
                // Check if user already has this achievement
                const userAchievement = await prisma.userAchievement.findFirst({
                    where: {
                        userId,
                        achievementId: achievement.id
                    }
                });

                // Award if not already earned
                if (!userAchievement) {
                    await prisma.userAchievement.create({
                        data: {
                            userId,
                            achievementId: achievement.id
                        }
                    });
                    console.log(`🏆 Achievement unlocked: ${milestone.title} (${milestone.days} day streak)`);
                }
            }
        }
    }
}

/**
 * Update user's currentStreak field and check achievements after completing a workout
 */
export async function updateUserStreak(userId: string): Promise<number> {
    const streak = await calculateWorkoutStreak(userId);

    // Update user's currentStreak field
    await prisma.user.update({
        where: { id: userId },
        data: { currentStreak: streak }
    });

    // Check and award streak achievements
    await checkStreakAchievements(userId, streak);

    return streak;
}
