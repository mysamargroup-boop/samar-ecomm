
'use server';

import { seedDatabase } from '@/lib/seed';
import { getAdminFirestore } from '@/lib/firebase-admin';

export async function seedDatabaseAction() {
    try {
        const adminDb = getAdminFirestore();
        await seedDatabase(adminDb);
        return { success: true, message: 'Database seeded successfully.' };
    } catch (error: any) {
        console.error('Database seeding failed:', error);
        return { success: false, message: error.message || 'Failed to seed database.' };
    }
}
