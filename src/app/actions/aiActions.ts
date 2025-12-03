'use server';

import { generateProductDescription as generateProductDescriptionFlow } from '@/ai/flows/generate-product-description';
import type { GenerateProductDescriptionInput } from '@/ai/flows/generate-product-description';

export async function generateDescriptionAction(input: GenerateProductDescriptionInput) {
  try {
    const result = await generateProductDescriptionFlow(input);
    return { success: true, description: result.description };
  } catch (error) {
    console.error('AI description generation failed:', error);
    return { success: false, error: 'Failed to generate description.' };
  }
}
