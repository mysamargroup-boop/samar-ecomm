
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { ProductSchema } from '@/lib/types';
import { collection, addDoc, updateDoc, doc, deleteDoc, getFirestore } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

const { firestore } = initializeFirebase();
const productsCollection = collection(firestore, 'products');

export async function createProduct(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  
  const parsedTags = rawFormData.tags ? JSON.parse(rawFormData.tags as string) : [];
  const parsedDimensions = rawFormData.dimensions ? JSON.parse(rawFormData.dimensions as string) : {};
  const parsedImages = rawFormData.images ? JSON.parse(rawFormData.images as string) : [];

  const validatedFields = ProductSchema.omit({ id: true }).safeParse({
    name: rawFormData.name,
    description: rawFormData.description,
    price: Number(rawFormData.price),
    salePrice: rawFormData.salePrice ? Number(rawFormData.salePrice) : undefined,
    categoryId: rawFormData.categoryId,
    inventory: Number(rawFormData.inventory),
    tags: parsedTags,
    images: parsedImages,
    dimensions: {
        length: parsedDimensions.length ? Number(parsedDimensions.length) : undefined,
        width: parsedDimensions.width ? Number(parsedDimensions.width) : undefined,
        height: parsedDimensions.height ? Number(parsedDimensions.height) : undefined,
    }
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to create product.',
    };
  }

  try {
    const docRef = await addDoc(productsCollection, validatedFields.data);
    console.log('Product created with ID:', docRef.id);
    revalidatePath('/samar/products');
    revalidatePath('/');
    return { message: 'Product created successfully.' };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { message: 'Failed to create product in Firestore.' };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const parsedTags = rawFormData.tags ? JSON.parse(rawFormData.tags as string) : [];
  const parsedDimensions = rawFormData.dimensions ? JSON.parse(rawFormData.dimensions as string) : {};
  const parsedImages = rawFormData.images ? JSON.parse(rawFormData.images as string) : [];

   const validatedFields = ProductSchema.omit({ id: true }).safeParse({
    name: rawFormData.name,
    description: rawFormData.description,
    price: Number(rawFormData.price),
    salePrice: rawFormData.salePrice ? Number(rawFormData.salePrice) : undefined,
    categoryId: rawFormData.categoryId,
    inventory: Number(rawFormData.inventory),
    images: parsedImages,
    tags: parsedTags,
    dimensions: {
        length: parsedDimensions.length ? Number(parsedDimensions.length) : undefined,
        width: parsedDimensions.width ? Number(parsedDimensions.width) : undefined,
        height: parsedDimensions.height ? Number(parsedDimensions.height) : undefined,
    }
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to update product.',
    };
  }

  try {
    const productDoc = doc(firestore, 'products', id);
    await updateDoc(productDoc, validatedFields.data);
    console.log(`Product ${id} updated.`);
    revalidatePath('/samar/products');
    revalidatePath(`/product/${id}`);
    revalidatePath('/');
    return { message: 'Product updated successfully.' };
  } catch (error) {
    console.error("Error updating document: ", error);
    return { message: 'Failed to update product in Firestore.' };
  }
}

export async function deleteProduct(id: string) {
  try {
    const productDoc = doc(firestore, 'products', id);
    await deleteDoc(productDoc);
    console.log(`Product ${id} deleted.`);
    revalidatePath('/samar/products');
    revalidatePath('/');
    return { message: 'Product deleted successfully.' };
  } catch (error) {
    console.error("Error deleting document: ", error);
    return { message: 'Failed to delete product.' };
  }
}
