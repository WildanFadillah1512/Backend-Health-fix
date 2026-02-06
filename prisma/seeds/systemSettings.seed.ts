import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSystemSettings() {
    console.log('🌱 Seeding system settings...');

    await prisma.systemSettings.upsert({
        where: { id: 'config' },
        update: {
            minAppVersion: '1.0.0',
            maintenanceMode: false,
            maintenanceMsg: null
        },
        create: {
            id: 'config',
            minAppVersion: '1.0.0',
            maintenanceMode: false,
            maintenanceMsg: null
        }
    });

    console.log('✅ Seeded system settings');
}
