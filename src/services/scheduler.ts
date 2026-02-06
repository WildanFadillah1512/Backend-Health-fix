import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Initialize scheduler
export const initScheduler = () => {
    console.log('⏰ Scheduler initialized');

    // Daily Workout Reminder at 8:00 AM
    cron.schedule('0 8 * * *', async () => {
        console.log('Running daily workout reminders...');
        try {
            const users = await prisma.userPreferences.findMany({
                where: { workoutReminder: true },
                include: { user: true }
            });

            console.log(`Found ${users.length} users enabled for reminders.`);

            // In a real app, we would loop and send push using Expo Server SDK or FCM
            // for (const pref of users) {
            //     sendPush(pref.user.pushToken, "Time to workout!", "Don't forget your goals today.");
            // }

        } catch (e) {
            console.error('Scheduler Error:', e);
        }
    });
};
