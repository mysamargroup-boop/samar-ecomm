import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// This is a server-only file. It should not be imported into client-side code.

const getAdminApp = () => {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  try {
    // Construct the absolute path to the service account key file
    // process.cwd() gives the root directory of the Next.js project
    const serviceAccountPath = path.join(process.cwd(), 'serviceAccountKey.json');
    
    // Read the file synchronously
    const serviceAccountFile = fs.readFileSync(serviceAccountPath, 'utf8');
    
    // Parse the file content as JSON
    const serviceAccount = JSON.parse(serviceAccountFile);

    // The type assertion is necessary because the imported JSON doesn't perfectly match the SDK's type
    const typedServiceAccount = serviceAccount as admin.ServiceAccount;

    return admin.initializeApp({
      credential: admin.credential.cert(typedServiceAccount),
    });
  } catch (e: any) {
    if (e.code === 'ENOENT') {
        throw new Error('serviceAccountKey.json not found in the project root. Please ensure the file exists.');
    }
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
