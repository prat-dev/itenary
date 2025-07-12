'use client';

import type { DragEvent } from 'react';
import { useState } from 'react';
import type { Itinerary, Destination, Activity } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ActivityCard from './activity-card';
import { FileUp, Lightbulb, Plus, Trash2 } from 'lucide-react';
import DestinationImporter from './destination-importer';
import DestinationSuggester from './destination-suggester';

type ItineraryBuilderProps = {
  itinerary: Itinerary;
  onUpdateItinerary: (itinerary: Itinerary) => void;
};

export default function ItineraryBuilder({ itinerary, onUpdateItinerary }: ItineraryBuilderProps) {
  const [draggedActivity, setDraggedActivity] = useState<{ destId: string; actId: string } | null>(null);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, destId: string, actId: string) => {
    setDraggedActivity({ destId, actId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, targetDestId: string, targetActId: string) => {
    e.preventDefault();
    if (!draggedActivity) return;

    const { destId: sourceDestId, actId: sourceActId } = draggedActivity;

    const newItinerary = JSON.parse(JSON.stringify(itinerary));
    const sourceDest = newItinerary.destinations.find((d: Destination) => d.id === sourceDestId);
    const targetDest = newItinerary.destinations.find((d: Destination) => d.id === targetDestId);

    if (!sourceDest || !targetDest) return;

    const sourceActivityIndex = sourceDest.activities.findIndex((a: Activity) => a.id === sourceActId);
    const [removedActivity] = sourceDest.activities.splice(sourceActivityIndex, 1);

    const targetActivityIndex = targetDest.activities.findIndex((a: Activity) => a.id === targetActId);
    targetDest.activities.splice(targetActivityIndex, 0, removedActivity);

    onUpdateItinerary(newItinerary);
    setDraggedActivity(null);
  };
  
  const handleAddDestination = (destinations: string[]) => {
    const newDestinations: Destination[] = destinations.map((name, index) => ({
      id: `new-dest-${Date.now()}-${index}`,
      name,
      activities: [],
      location: { lat: 0, lng: 0 }, // Placeholder location
    }));

    onUpdateItinerary({
      ...itinerary,
      destinations: [...itinerary.destinations, ...newDestinations],
    });
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl">{itinerary.name}</CardTitle>
          <CardDescription>Plan your {itinerary.tripType} trip.</CardDescription>
        </div>
         <div className="flex gap-2">
            <DestinationImporter onImport={handleAddDestination}>
              <Button variant="outline">
                <FileUp className="mr-2 h-4 w-4" /> Import
              </Button>
            </DestinationImporter>
            <DestinationSuggester itinerary={itinerary} onSuggest={handleAddDestination}>
              <Button variant="outline">
                <Lightbulb className="mr-2 h-4 w-4" /> Suggest
              </Button>
            </DestinationSuggester>
          </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto pr-2">
        <Accordion type="multiple" defaultValue={itinerary.destinations.map(d => d.id)} className="w-full">
          {itinerary.destinations.map(destination => (
            <AccordionItem value={destination.id} key={destination.id}>
              <AccordionTrigger className="text-lg font-medium hover:no-underline">
                {destination.name}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {destination.activities.length > 0 ? (
                    destination.activities.map(activity => (
                      <div
                        key={activity.id}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, destination.id, activity.id)}
                      >
                        <ActivityCard
                          activity={activity}
                          draggable
                          onDragStart={(e) => handleDragStart(e, destination.id, activity.id)}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground p-4 border-2 border-dashed rounded-lg">
                      <p>No activities yet.</p>
                      <Button variant="link" className="mt-2">
                        <Plus className="mr-2 h-4 w-4" /> Add Activity
                      </Button>
                    </div>
                  )}
                   <Button variant="outline" size="sm" className="w-full mt-4">
                      <Plus className="mr-2 h-4 w-4" /> Add Activity to {destination.name}
                    </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
