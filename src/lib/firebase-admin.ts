import * as admin from 'firebase-admin';

// This is a server-only file. It should not be imported into client-side code.

const getAdminApp = () => {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  // Construct the service account object from environment variables.
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // The private key must have newlines replaced correctly.
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };

  // Ensure all required environment variables are present.
  if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
    throw new Error('Firebase Admin SDK environment variables are not set. Please check your .env file.');
  }

  try {
    return admin.initializeApp({
      // The type assertion is necessary because the constructed object doesn't perfectly match the SDK's type.
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  } catch (e: any) {
    throw new Error(`Failed to initialize Firebase Admin SDK. Error: ${e.message}`);
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
