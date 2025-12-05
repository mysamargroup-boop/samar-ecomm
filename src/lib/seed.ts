
'use server';

import { collection, writeBatch, getDocs, Firestore, DocumentReference, DocumentData } from 'firebase/firestore';
import { placeholderProducts, categories as placeholderCategories } from './placeholder-data';
import type { firestore as adminFirestore } from 'firebase-admin';

// This function can now accept either the client or admin Firestore instance
export async function seedDatabase(db: Firestore | adminFirestore.Firestore) {
  const productsCollectionRef = db.collection('products');
  const categoriesCollectionRef = db.collection('categories');

  // Check if products are already seeded
  const productsSnapshot = await productsCollectionRef.get();
  if (productsSnapshot.empty) {
    const productBatch = db.batch();
    console.log('Seeding products...');
    placeholderProducts.forEach((product) => {
      // The admin SDK uses `doc(id)` on a collection, client uses `doc(db, path, id)`
      const docRef = productsCollectionRef.doc(product.id);
      const { id, ...productData } = product;
      productBatch.set(docRef, productData);
    });
    await productBatch.commit();
    console.log(`${placeholderProducts.length} products seeded.`);
  } else {
    console.log('Products collection is not empty, skipping seed.');
  }

  // Check if categories are already seeded
  const categoriesSnapshot = await categoriesCollectionRef.get();
  if (categoriesSnapshot.empty) {
    const categoryBatch = db.batch();
    console.log('Seeding categories...');
    placeholderCategories.forEach((category) => {
      const docRef = categoriesCollectionRef.doc(category.id);
      const { id, ...categoryData } = category;
      categoryBatch.set(docRef, categoryData);
    });
    await categoryBatch.commit();
    console.log(`${placeholderCategories.length} categories seeded.`);
  } else {
    console.log('Categories collection is not empty, skipping seed.');
  }
}
