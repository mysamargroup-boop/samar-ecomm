
'use server';

import { promises as fs } from 'fs';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const MarqueeDataSchema = z.object({
  text: z.string(),
  backgroundColor: z.string(),
  textColor: z.string(),
});

export async function updateMarqueeData(prevState: any, formData: FormData) {
  const validatedFields = MarqueeDataSchema.safeParse({
    text: formData.get('text'),
    backgroundColor: formData.get('backgroundColor'),
    textColor: formData.get('textColor'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid data submitted.',
    };
  }
  
  const { text, backgroundColor, textColor } = validatedFields.data;

  const filePath = 'src/lib/placeholder-data.ts';

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');

    // This is a brittle way to update the file, but it's suitable for this prototype.
    // A more robust solution would use an AST parser.
    const newFileContent = fileContent.replace(
        /export let marqueeData = {[\s\S]*?};/,
        `export let marqueeData = {\n  text: "${text.replace(/"/g, '\\"')}",\n  backgroundColor: "${backgroundColor}",\n  textColor: "${textColor}",\n};`
    );

    await fs.writeFile(filePath, newFileContent, 'utf-8');
    
    revalidatePath('/'); // Revalidate the homepage to show the new marquee data

    return { message: 'Marquee settings have been updated successfully.' };
  } catch (error) {
    console.error('Failed to update marquee data:', error);
    return { message: 'Failed to update settings file.' };
  }
}
