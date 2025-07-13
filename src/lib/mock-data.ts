import type { Itinerary } from './types';

export const mockItineraries: Itinerary[] = [
  {
    id: '1',
    name: 'Japanese Culinary Tour',
    tripType: 'leisure',
    isFavorite: true,
    destinations: [
      {
        id: 'dest-1',
        name: 'Tokyo',
        location: { lat: 35.6895, lng: 139.6917 },
        activities: [
          {
            id: 'act-1',
            name: 'Sushi Making Class',
            description: 'Learn from a master chef in Ginza.',
            photo: 'https://placehold.co/400x400.png',
            date: '2024-08-15',
          },
          {
            id: 'act-2',
            name: 'Visit Tsukiji Outer Market',
            description: 'Explore the bustling market and taste fresh seafood.',
            photo: 'https://placehold.co/401x401.png',
            date: '2024-08-16',
          },
        ],
      },
      {
        id: 'dest-2',
        name: 'Kyoto',
        location: { lat: 35.0116, lng: 135.7681 },
        activities: [
          {
            id: 'act-3',
            name: 'Kaiseki Dinner in Gion',
            description: 'Experience a traditional multi-course Japanese dinner.',
            photo: 'https://placehold.co/402x402.png',
            date: '2024-08-18',
          },
          {
            id: 'act-4',
            name: 'Tea Ceremony',
            description: 'Participate in a serene and traditional tea ceremony.',
            photo: 'https://placehold.co/403x403.png',
            date: '2024-08-19',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Adventure in Patagonia',
    tripType: 'adventure',
    isFavorite: false,
    destinations: [
      {
        id: 'dest-3',
        name: 'El Chaltén',
        location: { lat: -49.3314, lng: -72.8865 },
        activities: [
          {
            id: 'act-5',
            name: 'Hike to Mount Fitz Roy',
            description: 'A full-day trek to the iconic mountain.',
            photo: 'https://placehold.co/404x404.png',
            date: '2025-02-20',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'NYC Work Trip',
    tripType: 'work',
    isFavorite: false,
    destinations: [],
  }
];
