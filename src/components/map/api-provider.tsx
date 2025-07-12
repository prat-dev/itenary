'use client';

import { APIProvider } from '@vis.gl/react-google-maps';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { KeyRound } from 'lucide-react';

const MapAPIProvider = ({ children }: { children: React.ReactNode }) => {
  const [apiKey, setApiKey] = useState(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '');
  const [tempKey, setTempKey] = useState('');

  if (!apiKey) {
    return (
      <Card className="h-full flex flex-col justify-center">
        <CardHeader>
          <CardTitle>Setup Required</CardTitle>
          <CardDescription>
            Please provide a Google Maps API key to view the map.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <Alert>
                <KeyRound className="h-4 w-4" />
                <AlertTitle>Where to find your API key?</AlertTitle>
                <AlertDescription>
                    You can get a key from the Google Cloud Console. Make sure to enable the "Maps JavaScript API".
                </AlertDescription>
            </Alert>
          <Input
            type="text"
            placeholder="Enter your API key"
            value={tempKey}
            onChange={(e) => setTempKey(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button onClick={() => setApiKey(tempKey)} className="w-full" disabled={!tempKey}>
            Set Key & Load Map
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return <APIProvider apiKey={apiKey}>{children}</APIProvider>;
};

export default MapAPIProvider;
