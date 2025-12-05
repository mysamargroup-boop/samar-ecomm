
import * as admin from 'firebase-admin';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

// This is a server-only file. It should not be imported into client-side code.

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountPath) {
    if (process.env.NODE_ENV === 'production') {
        console.error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable (pointing to the service account file path) is not set. This is required for server-side Firebase Admin operations.');
    } else {
        console.warn('FIREBASE_SERVICE_ACCOUNT_KEY is not set. Admin SDK will not be initialized. This is okay for client-side development, but server actions needing admin privileges (like seeding) will fail.');
    }
}

const getAdminApp = () => {
    if (admin.apps.length > 0) {
        return admin.app();
    }
    
    if (!serviceAccountPath) {
        throw new Error('Firebase Admin SDK initialization failed: Service account file path is missing from .env file.');
    }

    try {
        // The environment variable now holds the path to the key file.
        // The `cert` function can take the path directly.
        return admin.initializeApp({
            credential: admin.credential.cert(serviceAccountPath)
        });
    } catch (e: any) {
        throw new Error(`Failed to initialize Firebase Admin SDK. Please ensure the path in FIREBASE_SERVICE_ACCOUNT_KEY is correct and the JSON file is valid. Error: ${e.message}`);
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
