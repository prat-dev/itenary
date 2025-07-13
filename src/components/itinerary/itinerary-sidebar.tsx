'use client';

import type { Itinerary } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Heart, Briefcase, MapPin, Tent } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

type ItinerarySidebarProps = {
  itineraries: Itinerary[];
  selectedItineraryId: string | null;
  onSelectItinerary: (id: string) => void;
};

const tripTypeIcons = {
  adventure: <Tent className="h-4 w-4" />,
  leisure: <MapPin className="h-4 w-4" />,
  work: <Briefcase className="h-4 w-4" />,
};

export default function ItinerarySidebar({
  itineraries,
  selectedItineraryId,
  onSelectItinerary,
}: ItinerarySidebarProps) {
  return (
    <aside className="hidden md:flex flex-col w-80 border-r bg-card">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold tracking-tight">My Itineraries</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {itineraries.map(itinerary => (
            <button
              key={itinerary.id}
              onClick={() => onSelectItinerary(itinerary.id)}
              className={cn(
                'w-full text-left p-3 rounded-lg transition-colors flex flex-col items-start gap-2',
                itinerary.id === selectedItineraryId
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-muted/50'
              )}
            >
              <div className="flex justify-between w-full items-start">
                <p className="font-semibold">{itinerary.name}</p>
                {itinerary.isFavorite && (
                  <Heart className="h-4 w-4 text-red-500 fill-current" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={itinerary.id === selectedItineraryId ? 'default' : 'secondary'} className="capitalize">
                    {tripTypeIcons[itinerary.tripType]}
                    <span className="ml-1">{itinerary.tripType}</span>
                </Badge>
                <p className="text-sm text-muted-foreground">
                  {itinerary.destinations.length} destinations
                </p>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
