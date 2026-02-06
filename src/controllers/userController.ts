import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

// Register or Sync User after Firebase Signup
export const syncProfile = async (req: AuthRequest, res: Response) => {
    try {
        const { uid, email } = req.user!;
        const { name, weight, height, age, gender, goal, activityLevel, targetWeight } = req.body;

        console.log('🔄 Syncing Profile:', { uid, email, name, weight, height, age });

        // Safe parsing with fallbacks
        const parsedWeight = parseFloat(String(weight)) || 0;
        const parsedHeight = parseFloat(String(height)) || 0;
        const parsedAge = parseInt(String(age)) || 0;
        const parsedTargetWeight = parseFloat(String(targetWeight)) || 0;

        // Use placeholder email if missing to avoid unique constraint violation
        const safeEmail = email || `${uid}@placeholder.com`;

        const user = await prisma.user.upsert({
            where: { firebaseUid: uid },
            update: {
                email: safeEmail,
                name: name || 'User',
                weight: parsedWeight,
                height: parsedHeight,
                age: parsedAge,
                gender: gender || 'other',
                goal: goal || 'maintenance',
                activityLevel: activityLevel || 'moderate',
                targetWeight: parsedTargetWeight,
                hasOnboarded: true
            },
            create: {
                firebaseUid: uid,
                email: safeEmail,
                name: name || 'User',
                weight: parsedWeight,
                height: parsedHeight,
                age: parsedAge,
                gender: gender || 'other',
                goal: goal || 'maintenance',
                activityLevel: activityLevel || 'moderate',
                targetWeight: parsedTargetWeight,
                hasOnboarded: true,
                preferences: {
                    create: {
                        weightUnit: 'kg',
                        heightUnit: 'cm',
                        theme: 'dark'
                    }
                }
            },
            include: {
                preferences: true
            }
        });

        console.log('✅ Profile Synced Successfully:', user.id);
        res.json(user);
    } catch (error: any) {
        console.error('❌ Sync Profile Error:', error);
        // Log specific prisma error
        if (error.code) {
            console.error('Prisma Error Code:', error.code);
            console.error('Prisma Meta:', error.meta);
        }
        res.status(500).json({ error: 'Failed to sync profile', details: error.message });
    }
};

// Get User Profile
export const getProfile = async (req: AuthRequest, res: Response) => {
    try {
        const { uid } = req.user!;

        const user = await prisma.user.findUnique({
            where: { firebaseUid: uid },
            include: {
                preferences: true,
                achievements: {
                    take: 5,
                    include: { achievement: true }
                }
            }
        });

        // Return null for new users who haven't completed onboarding yet
        // This is normal - they will complete onboarding and POST /user/sync
        if (!user) {
            res.json(null);
            return;
        }

        res.json(user);
    } catch (error) {
    }
};

// Update Daily Stats (Water, Sleep, etc)
export const updateDailyStats = async (req: AuthRequest, res: Response) => {
    try {
        const { uid } = req.user!;
        const { water, sleep, calories, minutes, workouts } = req.body;
        // date can be passed, defaults to today
        const { date } = req.body;

        const user = await prisma.user.findUnique({ where: { firebaseUid: uid } });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const dateKey = date ? new Date(date) : new Date();
        dateKey.setHours(0, 0, 0, 0);

        // Construct update object dynamically
        const updateData: any = {};
        if (water !== undefined) updateData.water = { increment: water };
        if (sleep !== undefined) updateData.sleep = sleep; // Set sleep absolute value
        if (calories !== undefined) updateData.calories = { increment: calories };
        if (minutes !== undefined) updateData.minutes = { increment: minutes };
        if (workouts !== undefined) updateData.workouts = { increment: workouts };

        // Construct create object
        const createData = {
            userId: user.id,
            date: dateKey,
            water: water || 0,
            sleep: sleep || 0,
            calories: calories || 0,
            minutes: minutes || 0,
            workouts: workouts || 0
        };

        const stats = await prisma.dailyStats.upsert({
            where: {
                userId_date: { userId: user.id, date: dateKey }
            },
            update: updateData,
            create: createData
        });

        res.json(stats);
    } catch (error: any) {
        console.error('Update Stats Error:', error);
        res.status(500).json({ error: 'Failed to update stats' });
    }
};

// Update Preferences
export const updatePreferences = async (req: AuthRequest, res: Response) => {
    try {
        const { uid } = req.user!;
        const { weightUnit, heightUnit, workoutReminder, reminderTime, dailyGoalAlert, theme, calorieGoal } = req.body;

        const user = await prisma.user.findUnique({ where: { firebaseUid: uid } });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const preferences = await prisma.userPreferences.upsert({
            where: { userId: user.id },
            update: {
                weightUnit,
                heightUnit,
                workoutReminder,
                reminderTime,
                dailyGoalAlert,
                theme,
                calorieGoal
            },
            create: {
                userId: user.id,
                weightUnit: weightUnit || 'kg',
                heightUnit: heightUnit || 'cm',
                workoutReminder: workoutReminder ?? true,
                reminderTime,
                dailyGoalAlert: dailyGoalAlert ?? true,
                theme: theme || 'dark',
                calorieGoal: calorieGoal || 2000
            }
        });

        res.json(preferences);
    } catch (error) {
        console.error('Update Preferences Error:', error);
        res.status(500).json({ error: 'Failed to update preferences' });
    }
};
