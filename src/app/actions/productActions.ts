
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { ProductSchema } from '@/lib/types';

// This is a mock implementation. In a real app, you would interact with a database.

export async function createProduct(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  
  const parsedTags = rawFormData.tags ? JSON.parse(rawFormData.tags as string) : [];

  const validatedFields = ProductSchema.omit({ id: true, images: true }).safeParse({
    name: rawFormData.name,
    description: rawFormData.description,
    price: Number(rawFormData.price),
    salePrice: rawFormData.salePrice ? Number(rawFormData.salePrice) : undefined,
    categoryId: rawFormData.categoryId,
    inventory: Number(rawFormData.inventory),
    tags: parsedTags,
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to create product.',
    };
  }

  console.log('Creating product:', validatedFields.data);
  // In a real app, you would save this to your database.

  revalidatePath('/samar/products');
  return { message: 'Product created successfully.' };
}

export async function updateProduct(id: string, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const parsedTags = rawFormData.tags ? JSON.parse(rawFormData.tags as string) : [];

   const validatedFields = ProductSchema.omit({ id: true, images: true }).safeParse({
    name: rawFormData.name,
    description: rawFormData.description,
    price: Number(rawFormData.price),
    salePrice: rawFormData.salePrice ? Number(rawFormData.salePrice) : undefined,
    categoryId: rawFormData.categoryId,
    inventory: Number(rawFormData.inventory),
    tags: parsedTags,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to update product.',
    };
  }

  console.log(`Updating product ${id}:`, validatedFields.data);
  // In a real app, you would update this in your database.

  revalidatePath('/samar/products');
  revalidatePath(`/product/${id}`);
  return { message: 'Product updated successfully.' };
}

export async function deleteProduct(id: string) {
  console.log(`Deleting product ${id}`);
  // In a real app, you would delete this from your database.

  revalidatePath('/samar/products');
  return { message: 'Product deleted successfully.' };
}
