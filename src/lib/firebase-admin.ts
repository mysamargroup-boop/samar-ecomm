import * as admin from 'firebase-admin';
import serviceAccount from '../../serviceAccountKey.json';

// This is a server-only file. It should not be imported into client-side code.

const getAdminApp = () => {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  // The type assertion is necessary because the imported JSON doesn't perfectly match the SDK's type
  const typedServiceAccount = serviceAccount as admin.ServiceAccount;

  try {
    return admin.initializeApp({
      credential: admin.credential.cert(typedServiceAccount),
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
