'use server';

/**
 * @fileOverview Generates a product name using AI based on provided keywords.
 *
 * - generateProductName - A function that generates a product name.
 * - GenerateProductNameInput - The input type for the generateProductName function.
 * - GenerateProductNameOutput - The return type for the generateProductName function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductNameInputSchema = z.object({
  keywords: z.string().describe('Keywords or a brief description of the product.'),
});
export type GenerateProductNameInput = z.infer<typeof GenerateProductNameInputSchema>;

const GenerateProductNameOutputSchema = z.object({
  productName: z.string().describe('The generated product name.'),
});
export type GenerateProductNameOutput = z.infer<typeof GenerateProductNameOutputSchema>;

export async function generateProductName(
  input: GenerateProductNameInput
): Promise<GenerateProductNameOutput> {
  return generateProductNameFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductNamePrompt',
  input: {schema: GenerateProductNameInputSchema},
  output: {schema: GenerateProductNameOutputSchema},
  prompt: `You are an expert copywriter specializing in creating compelling product names for e-commerce websites.

  Based on the keywords provided, generate a creative and marketable product name.

  Keywords: {{{keywords}}}
  `,
});

const generateProductNameFlow = ai.defineFlow(
  {
    name: 'generateProductNameFlow',
    inputSchema: GenerateProductNameInputSchema,
    outputSchema: GenerateProductNameOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
