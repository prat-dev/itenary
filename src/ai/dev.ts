import { config } from 'dotenv';
config();

import '@/ai/flows/destination-importer.ts';
import '@/ai/flows/suggest-destinations.ts';
import '@/ai/flows/generate-activity.ts';
