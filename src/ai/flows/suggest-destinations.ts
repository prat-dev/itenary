// Implemented the suggestDestinations flow, input and output schemas, and prompt for suggesting travel destinations based on a partially completed itinerary.

'use server';

/**
 * @fileOverview Destination suggestion AI agent.
 *
 * - suggestDestinations - A function that handles the destination suggestion process.
 * - SuggestDestinationsInput - The input type for the suggestDestinations function.
 * - SuggestDestinationsOutput - The return type for the suggestDestinations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDestinationsInputSchema = z.object({
  itinerary: z
    .string()
    .describe('The current travel itinerary, including known destinations and activities.'),
  tripType: z
    .string()
    .describe(
      'The type of trip, e.g., adventure, leisure, work, which helps in tailoring destination suggestions.'
    ),
});
export type SuggestDestinationsInput = z.infer<typeof SuggestDestinationsInputSchema>;

const SuggestDestinationsOutputSchema = z.object({
  destinations: z
    .array(z.string())
    .describe('An array of suggested destinations based on the itinerary and trip type.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the destination suggestions, explaining why each destination is suitable.'),
});
export type SuggestDestinationsOutput = z.infer<typeof SuggestDestinationsOutputSchema>;

export async function suggestDestinations(
  input: SuggestDestinationsInput
): Promise<SuggestDestinationsOutput> {
  return suggestDestinationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDestinationsPrompt',
  input: {schema: SuggestDestinationsInputSchema},
  output: {schema: SuggestDestinationsOutputSchema},
  prompt: `You are an expert travel planner. Given a partially completed travel itinerary and the type of trip, suggest destinations that would be a good fit.

Itinerary: {{{itinerary}}}
Trip Type: {{{tripType}}}

Consider the itinerary and trip type when suggesting destinations. Provide a brief reasoning for each suggestion.

Output the destinations as an array of strings and the reasoning as a string.

Example:
{
  "destinations": ["Paris", "Rome", "Barcelona"],
  "reasoning": "Paris is a romantic city with many cultural attractions. Rome is a historical city with ancient ruins. Barcelona is a vibrant city with beautiful beaches."
}
`,
});

const suggestDestinationsFlow = ai.defineFlow(
  {
    name: 'suggestDestinationsFlow',
    inputSchema: SuggestDestinationsInputSchema,
    outputSchema: SuggestDestinationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
