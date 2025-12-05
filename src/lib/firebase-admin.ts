
import * as admin from 'firebase-admin';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

// This is a server-only file. It should not be imported into client-side code.

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccount) {
    if (process.env.NODE_ENV === 'production') {
        console.error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. This is required for server-side Firebase Admin operations.');
    } else {
        console.warn('FIREBASE_SERVICE_ACCOUNT_KEY is not set. Admin SDK will not be initialized. This is okay for client-side development, but server actions needing admin privileges (like seeding) will fail.');
    }
}

const getAdminApp = () => {
    if (admin.apps.length > 0) {
        return admin.app();
    }
    
    if (!serviceAccount) {
        throw new Error('Firebase Admin SDK initialization failed: Service account key is missing.');
    }

    try {
        const parsedServiceAccount = JSON.parse(Buffer.from(serviceAccount, 'base64').toString('utf8'));
        
        return admin.initializeApp({
            credential: admin.credential.cert(parsedServiceAccount)
        });
    } catch (e: any) {
        throw new Error(`Failed to parse Firebase service account key. Please ensure it is a valid base64 encoded JSON. Error: ${e.message}`);
    }
};


export const getAdminFirestore = () => {
    const app = getAdminApp();
    return admin.firestore(app);
}

export const getAdminAuth = () => {
    const app = getAdminApp();
    return admin.auth(app);
}
