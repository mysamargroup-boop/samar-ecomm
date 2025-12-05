
'use server';

import { collection, writeBatch, getDocs, Firestore } from 'firebase/firestore';
import { placeholderProducts, categories as placeholderCategories } from './placeholder-data';

export async function seedDatabase(db: Firestore) {
  const productsCollection = collection(db, 'products');
  const categoriesCollection = collection(db, 'categories');

  // Check if products are already seeded
  const productsSnapshot = await getDocs(productsCollection);
  if (productsSnapshot.empty) {
    const productBatch = writeBatch(db);
    console.log('Seeding products...');
    placeholderProducts.forEach((product) => {
      const { id, ...productData } = product;
      const docRef = collection(db, 'products').doc(id);
      productBatch.set(docRef, productData);
    });
    await productBatch.commit();
    console.log(`${placeholderProducts.length} products seeded.`);
  } else {
    console.log('Products collection is not empty, skipping seed.');
  }

  // Check if categories are already seeded
  const categoriesSnapshot = await getDocs(categoriesCollection);
  if (categoriesSnapshot.empty) {
    const categoryBatch = writeBatch(db);
    console.log('Seeding categories...');
    placeholderCategories.forEach((category) => {
      const { id, ...categoryData } = category;
      const docRef = collection(db, 'categories').doc(id);
      categoryBatch.set(docRef, categoryData);
    });
    await categoryBatch.commit();
    console.log(`${placeholderCategories.length} categories seeded.`);
  } else {
    console.log('Categories collection is not empty, skipping seed.');
  }
}
