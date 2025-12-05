
'use server';

import { seedDatabase } from '@/lib/seed';
import { initializeFirebase } from '@/firebase';

export async function seedDatabaseAction() {
    try {
        const { firestore } = initializeFirebase();
        await seedDatabase(firestore);
        return { success: true, message: 'Database seeded successfully.' };
    } catch (error) {
        console.error('Database seeding failed:', error);
        return { success: false, message: 'Failed to seed database.' };
    }
}
