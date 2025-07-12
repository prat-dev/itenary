// destination-importer.ts
'use server';
/**
 * @fileOverview Imports destinations from plain text.
 *
 * - importDestinations - A function that handles the importing of destinations from plain text.
 * - ImportDestinationsInput - The input type for the importDestinations function.
 * - ImportDestinationsOutput - The return type for the importDestinations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImportDestinationsInputSchema = z.object({
  text: z
    .string()
    .describe(
      'A plain text string containing a list of destinations, each on a new line.'
    ),
});
export type ImportDestinationsInput = z.infer<typeof ImportDestinationsInputSchema>;

const ImportDestinationsOutputSchema = z.object({
  destinations: z.array(z.string()).describe('An array of destinations.'),
});
export type ImportDestinationsOutput = z.infer<typeof ImportDestinationsOutputSchema>;

export async function importDestinations(input: ImportDestinationsInput): Promise<ImportDestinationsOutput> {
  return importDestinationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'importDestinationsPrompt',
  input: {schema: ImportDestinationsInputSchema},
  output: {schema: ImportDestinationsOutputSchema},
  prompt: `You are a travel expert. Extract the destinations from the following text. 
  
Return the data as a JSON object that adheres to the following schema:
{
  "destinations": ["destination1", "destination2", ...]
}

Do not include any other information or formatting.

Text: {{{text}}}`,
});

const importDestinationsFlow = ai.defineFlow(
  {
    name: 'importDestinationsFlow',
    inputSchema: ImportDestinationsInputSchema,
    outputSchema: ImportDestinationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
