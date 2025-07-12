'use client';

import { useState } from 'react';
import type { Itinerary } from '@/lib/types';
import { mockItineraries } from '@/lib/mock-data';
import AppHeader from '@/components/app-header';
import ItinerarySidebar from '@/components/itinerary/itinerary-sidebar';
import ItineraryBuilder from '@/components/itinerary/itinerary-builder';
import MapView from '@/components/map/map-view';
import { Button } from '@/components/ui/button';
import { Plane, Plus } from 'lucide-react';
import MapAPIProvider from '@/components/map/api-provider';

export default function Home() {
  const [itineraries, setItineraries] = useState<Itinerary[]>(mockItineraries);
  const [selectedItineraryId, setSelectedItineraryId] = useState<string | null>(
    itineraries[0]?.id || null
  );

  const selectedItinerary = itineraries.find(it => it.id === selectedItineraryId) || null;

  const handleUpdateItinerary = (updatedItinerary: Itinerary) => {
    setItineraries(prev =>
      prev.map(it => (it.id === updatedItinerary.id ? updatedItinerary : it))
    );
  };

  const handleSelectItinerary = (id: string) => {
    setSelectedItineraryId(id);
  };

  return (
    <div className="flex h-dvh w-full flex-col">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <ItinerarySidebar
          itineraries={itineraries}
          selectedItineraryId={selectedItineraryId}
          onSelectItinerary={handleSelectItinerary}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-background">
          {selectedItinerary ? (
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 h-full min-h-[calc(100vh-8rem)]">
              <div className="xl:col-span-3 h-full">
                <ItineraryBuilder
                  key={selectedItinerary.id}
                  itinerary={selectedItinerary}
                  setItinerary={handleUpdateItinerary}
                />
              </div>
              <div className="xl:col-span-2 h-full flex flex-col">
                 <MapAPIProvider>
                   <MapView destinations={selectedItinerary.destinations} />
                 </MapAPIProvider>
              </div>
            </div>
          ) : (
             <div className="flex h-full items-center justify-center rounded-lg bg-cover bg-center" style={{backgroundImage: 'url(https://placehold.co/1200x800.png)'}} data-ai-hint="travel destination">
              <div className="text-center bg-background/80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
                <Plane className="mx-auto h-12 w-12 text-primary" />
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Welcome to RoamFlow</h2>
                <p className="mt-2 text-muted-foreground max-w-md">
                  Your intelligent travel planner. Select an itinerary to start or create a new adventure.
                </p>
                <Button className="mt-6">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Itinerary
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
