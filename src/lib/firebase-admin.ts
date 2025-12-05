
import * as admin from 'firebase-admin';

// This is a server-only file. It should not be imported into client-side code.

const getAdminApp = () => {
  // If the app is already initialized, return it.
  if (admin.apps.length > 0) {
    return admin.app();
  }

  // Otherwise, initialize the app.
  // When deployed to a Google Cloud environment (like Firebase Hosting with a server-side component),
  // the SDK can automatically discover the service account credentials.
  // No need to manually pass in the credential object.
  try {
    return admin.initializeApp();
  } catch (e: any) {
    // This will catch errors if the initialization fails.
    console.error('Failed to initialize Firebase Admin SDK automatically.', e);
    throw new Error(`Failed to initialize Firebase Admin SDK. Ensure the server is running in a Google Cloud environment or service account credentials are set up correctly. Error: ${e.message}`);
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
