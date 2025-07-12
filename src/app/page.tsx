'use client';

import { useState } from 'react';
import type { Itinerary } from '@/lib/types';
import { mockItineraries } from '@/lib/mock-data';
import AppHeader from '@/components/app-header';
import ItinerarySidebar from '@/components/itinerary/itinerary-sidebar';
import ItineraryBuilder from '@/components/itinerary/itinerary-builder';
import MapView from '@/components/map/map-view';
import { Card, CardContent } from '@/components/ui/card';
import { Plane } from 'lucide-react';
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
            <div className="flex h-full items-center justify-center rounded-lg border-dashed border-2">
              <div className="text-center">
                <Plane className="mx-auto h-12 w-12 text-muted-foreground" />
                <h2 className="mt-4 text-2xl font-semibold text-foreground">Welcome to RoamFlow</h2>
                <p className="mt-2 text-muted-foreground">
                  Select an itinerary to start planning or create a new one.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
