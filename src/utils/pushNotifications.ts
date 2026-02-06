import { Expo, ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';

// Create Expo SDK client
const expo = new Expo();

export interface PushNotificationPayload {
    to: string | string[];
    title: string;
    body: string;
    data?: Record<string, any>;
    sound?: 'default' | null;
    badge?: number;
    priority?: 'default' | 'normal' | 'high';
}

/**
 * Send push notification via Expo Push Notification Service
 */
export async function sendPushNotification(
    pushToken: string,
    title: string,
    body: string,
    data?: Record<string, any>
): Promise<void> {
    try {
        // Check if token is valid Expo push token
        if (!Expo.isExpoPushToken(pushToken)) {
            console.error(`Push token ${pushToken} is not a valid Expo push token`);
            return;
        }

        // Create message payload
        const message: ExpoPushMessage = {
            to: pushToken,
            sound: 'default',
            title,
            body,
            data: data || {},
            priority: 'high',
        };

        // Send the notification
        const tickets = await expo.sendPushNotificationsAsync([message]);

        // Log the ticket for monitoring
        console.log('✅ Push notification sent:', {
            title,
            body,
            ticket: tickets[0],
        });

        // Check for errors
        if (tickets[0].status === 'error') {
            console.error('❌ Error sending push notification:', tickets[0].message);
        }
    } catch (error) {
        console.error('❌ Failed to send push notification:', error);
        throw error;
    }
}

/**
 * Send push notifications to multiple devices
 */
export async function sendBulkPushNotifications(
    notifications: PushNotificationPayload[]
): Promise<ExpoPushTicket[]> {
    try {
        // Filter valid Expo push tokens
        const messages: ExpoPushMessage[] = notifications
            .filter(notif => {
                const tokens = Array.isArray(notif.to) ? notif.to : [notif.to];
                return tokens.every(token => Expo.isExpoPushToken(token));
            })
            .map(notif => ({
                to: notif.to,
                sound: notif.sound || 'default',
                title: notif.title,
                body: notif.body,
                data: notif.data || {},
                badge: notif.badge,
                priority: notif.priority || 'default',
            }));

        if (messages.length === 0) {
            console.warn('⚠️ No valid push tokens found');
            return [];
        }

        // Chunk messages (Expo recommends max 100 per request)
        const chunks = expo.chunkPushNotifications(messages);
        const allTickets: ExpoPushTicket[] = [];

        for (const chunk of chunks) {
            try {
                const tickets = await expo.sendPushNotificationsAsync(chunk);
                allTickets.push(...tickets);
            } catch (error) {
                console.error('❌ Error sending notification chunk:', error);
            }
        }

        console.log(`✅ Sent ${allTickets.length} push notifications`);
        return allTickets;
    } catch (error) {
        console.error('❌ Failed to send bulk push notifications:', error);
        throw error;
    }
}

/**
 * Verify push token is valid
 */
export function isValidPushToken(token: string): boolean {
    return Expo.isExpoPushToken(token);
}
