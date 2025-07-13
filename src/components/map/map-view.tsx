'use client';

import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import type { Destination } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type MapViewProps = {
  destinations: Destination[];
};

export default function MapView({ destinations }: MapViewProps) {
  const center = destinations.length > 0 ? destinations[0].location : { lat: 0, lng: 0 };
  const zoom = destinations.length > 0 ? 6 : 2;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Map View</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 rounded-b-lg overflow-hidden">
        <div className="h-full w-full">
            <Map
              defaultCenter={center}
              defaultZoom={zoom}
              mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || 'DEMO_MAP_ID'}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
              className="rounded-lg"
            >
              {destinations.map(destination => (
                <AdvancedMarker key={destination.id} position={destination.location} title={destination.name}>
                    <Pin />
                </AdvancedMarker>
              ))}
            </Map>
        </div>
      </CardContent>
    </Card>
  );
}
