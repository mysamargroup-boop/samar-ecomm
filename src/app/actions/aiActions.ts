'use server';

import { generateProductDescription as generateProductDescriptionFlow } from '@/ai/flows/generate-product-description';
import type { GenerateProductDescriptionInput } from '@/ai/flows/generate-product-description';
import { generateProductName as generateProductNameFlow } from '@/ai/flows/generate-product-name';
import type { GenerateProductNameInput } from '@/ai/flows/generate-product-name';

export async function generateDescriptionAction(input: GenerateProductDescriptionInput) {
  try {
    const result = await generateProductDescriptionFlow(input);
    return { success: true, description: result.description };
  } catch (error) {
    console.error('AI description generation failed:', error);
    return { success: false, error: 'Failed to generate description.' };
  }
}

export async function generateNameAction(input: GenerateProductNameInput) {
    try {
      const result = await generateProductNameFlow(input);
      return { success: true, productName: result.productName };
    } catch (error) {
      console.error('AI name generation failed:', error);
      return { success: false, error: 'Failed to generate product name.' };
    }
}
