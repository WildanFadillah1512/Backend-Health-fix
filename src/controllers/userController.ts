import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

// Register or Sync User after Firebase Signup
export const syncProfile = async (req: AuthRequest, res: Response) => {
    try {
        const { uid, email } = req.user!;
        const { name, weight, height, age, gender, goal, activityLevel, targetWeight } = req.body;

        const user = await prisma.user.upsert({
            where: { firebaseUid: uid },
            update: {
                email: email || "",
                name,
                weight: parseFloat(weight),
                height: parseFloat(height),
                age: parseInt(age),
                gender,
                goal,
                activityLevel,
                targetWeight: parseFloat(targetWeight),
                hasOnboarded: true
            },
            create: {
                firebaseUid: uid,
                email: email || "",
                name,
                weight: parseFloat(weight),
                height: parseFloat(height),
                age: parseInt(age),
                gender,
                goal,
                activityLevel,
                targetWeight: parseFloat(targetWeight),
                hasOnboarded: true,
                // Initialize default preferences
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

        res.json(user);
    } catch (error) {
        console.error('Sync Profile Error:', error);
        res.status(500).json({ error: 'Failed to sync profile' });
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
        console.error('Get Profile Error:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
};
