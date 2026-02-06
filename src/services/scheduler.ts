import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import { sendPushNotification } from '../utils/pushNotifications';

const prisma = new PrismaClient();

// Initialize scheduler
export const initScheduler = () => {
    console.log('⏰ Scheduler initialized');

    // Daily Workout Reminder at 9:00 AM
    cron.schedule('0 9 * * *', async () => {
        console.log('🔔 Running daily workout reminders...');
        try {
            const users = await prisma.user.findMany({
                where: {
                    preferences: { workoutReminder: true },
                    pushToken: { not: null }
                },
                include: { preferences: true }
            });

            console.log(`📱 Found ${users.length} users with workout reminders enabled`);

            for (const user of users) {
                if (user.pushToken) {
                    try {
                        // Send push notification
                        await sendPushNotification(
                            user.pushToken,
                            'Daily Workout Reminder',
                            `Time to crush your fitness goals, ${user.name}! 💪`
                        );

                        // Create in-app notification
                        await prisma.notification.create({
                            data: {
                                userId: user.id,
                                title: 'Daily Workout Reminder',
                                message: 'Time to crush your fitness goals! 💪',
                                type: 'reminder',
                                read: false
                            }
                        });

                        console.log(`✅ Reminder sent to ${user.name}`);
                    } catch (error) {
                        console.error(`❌ Failed to send reminder to ${user.name}:`, error);
                    }
                }
            }

            console.log('✅ Daily workout reminders completed');
        } catch (e) {
            console.error('❌ Scheduler Error:', e);
        }
    });

    console.log('✅ Daily workout reminder scheduled for 9:00 AM');
};
