import * as admin from 'firebase-admin';

// This is a server-only file. It should not be imported into client-side code.

const getAdminApp = () => {
  // If the app is already initialized, return it.
  if (admin.apps.length > 0) {
    return admin.app();
  }

  // When GOOGLE_APPLICATION_CREDENTIALS environment variable is set,
  // initializeApp() automatically uses it.
  try {
    return admin.initializeApp();
  } catch (e: any) {
    console.error('Failed to initialize Firebase Admin SDK automatically.', e);
    throw new Error(`Failed to initialize Firebase Admin SDK. Ensure the GOOGLE_APPLICATION_CREDENTIALS environment variable is set correctly. Error: ${e.message}`);
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
