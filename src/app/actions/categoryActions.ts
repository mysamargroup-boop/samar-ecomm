'use server';

import { revalidatePath } from 'next/cache';
import { CategorySchema } from '@/lib/types';

export async function createCategory(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = CategorySchema.omit({ id: true }).safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to create category.',
    };
  }

  console.log('Creating category:', validatedFields.data);
  revalidatePath('/samar/categories');
  return { message: 'Category created successfully.' };
}

export async function updateCategory(id: string, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = CategorySchema.omit({ id: true }).safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to update category.',
    };
  }
  
  console.log(`Updating category ${id}:`, validatedFields.data);
  revalidatePath('/samar/categories');
  return { message: 'Category updated successfully.' };
}

export async function deleteCategory(id: string) {
  console.log(`Deleting category ${id}`);
  revalidatePath('/samar/categories');
  return { message: 'Category deleted successfully.' };
}
