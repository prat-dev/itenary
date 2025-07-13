'use server';
/**
 * @fileOverview Generates a travel activity with a description and photo hint.
 *
 * - generateActivity - A function that generates details for a travel activity.
 * - GenerateActivityInput - The input type for the generateActivity function.
 * - GenerateActivityOutput - The return type for the generateActivity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateActivityInputSchema = z.object({
  name: z.string().describe('The name of the activity.'),
  destination: z.string().describe('The destination where the activity takes place.'),
});
export type GenerateActivityInput = z.infer<typeof GenerateActivityInputSchema>;

const GenerateActivityOutputSchema = z.object({
  description: z.string().describe('A brief, engaging description of the activity (1-2 sentences).'),
  photoHint: z
    .string()
    .describe(
      'Two keywords that visually represent the activity, to be used for finding a photo. For example: "eiffel tower".'
    ),
});
export type GenerateActivityOutput = z.infer<typeof GenerateActivityOutputSchema>;

export async function generateActivity(input: GenerateActivityInput): Promise<GenerateActivityOutput> {
  return generateActivityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateActivityPrompt',
  input: {schema: GenerateActivityInputSchema},
  output: {schema: GenerateActivityOutputSchema},
  prompt: `You are a travel expert creating a summary for a travel itinerary activity.
Given the name of the activity and its location, generate a brief, engaging description (1-2 sentences long).
Also, provide a two-word "photo hint" that can be used to find a suitable image.

Activity Name: {{{name}}}
Destination: {{{destination}}}

Example:
Input: { name: "Visit the Louvre Museum", destination: "Paris" }
Output: {
  "description": "Home to masterpieces like the Mona Lisa, the Louvre is a world-renowned museum showcasing art from antiquity to the 19th century.",
  "photoHint": "louvre museum"
}
`,
});

const generateActivityFlow = ai.defineFlow(
  {
    name: 'generateActivityFlow',
    inputSchema: GenerateActivityInputSchema,
    outputSchema: GenerateActivityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
