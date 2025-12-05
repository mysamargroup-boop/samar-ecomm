
'use server';

import { revalidatePath } from 'next/cache';
import { ProductSchema } from '@/lib/types';

export async function createProduct(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  
  // This needs to be updated to handle data types (e.g. JSONB)
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
    },
    createdAt: new Date(),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to create product.',
    };
  }

  // DB insert logic goes here
  console.log("Creating product:", validatedFields.data);

  revalidatePath('/samar/products');
  revalidatePath('/');
  return { message: 'Product created successfully (simulated).' };
}

export async function updateProduct(id: string, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  // This needs to be updated to handle data types (e.g. JSONB)
  const parsedTags = rawFormData.tags ? JSON.parse(rawFormData.tags as string) : [];
  const parsedDimensions = rawFormData.dimensions ? JSON.parse(rawFormData.dimensions as string) : {};
  const parsedImages = rawFormData.images ? JSON.parse(rawFormData.images as string) : [];

   const validatedFields = ProductSchema.omit({ id: true, createdAt: true }).safeParse({
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

  // DB update logic goes here
  console.log(`Updating product ${id}:`, validatedFields.data);

  revalidatePath('/samar/products');
  revalidatePath(`/product/${id}`);
  revalidatePath('/');
  return { message: 'Product updated successfully (simulated).' };
}

export async function deleteProduct(id: string) {
  
  // DB delete logic goes here
  console.log(`Deleting product ${id}`);

  revalidatePath('/samar/products');
  revalidatePath('/');
  return { message: 'Product deleted successfully (simulated).' };
}
