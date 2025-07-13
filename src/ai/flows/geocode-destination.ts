'use server';
/**
 * @fileOverview Geocodes a destination name to latitude and longitude.
 *
 * - geocodeDestination - A function that returns the lat/lng for a destination name.
 * - GeocodeDestinationInput - The input type for the geocodeDestination function.
 * - GeocodeDestinationOutput - The return type for the geocodeDestination function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeocodeDestinationInputSchema = z.object({
  name: z.string().describe('The name of the destination to geocode. e.g. "Paris, France"'),
});
export type GeocodeDestinationInput = z.infer<typeof GeocodeDestinationInputSchema>;

const GeocodeDestinationOutputSchema = z.object({
    lat: z.number().describe('The latitude of the destination.'),
    lng: z.number().describe('The longitude of the destination.'),
});
export type GeocodeDestinationOutput = z.infer<typeof GeocodeDestinationOutputSchema>;

export async function geocodeDestination(input: GeocodeDestinationInput): Promise<GeocodeDestinationOutput> {
  return geocodeDestinationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'geocodeDestinationPrompt',
  input: {schema: GeocodeDestinationInputSchema},
  output: {schema: GeocodeDestinationOutputSchema},
  prompt: `You are a geocoding expert. Given the name of a destination, provide its latitude and longitude.

Destination: {{{name}}}

Return only the JSON object with the coordinates.
`,
});

const geocodeDestinationFlow = ai.defineFlow(
  {
    name: 'geocodeDestinationFlow',
    inputSchema: GeocodeDestinationInputSchema,
    outputSchema: GeocodeDestinationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
