'use client';

import { APIProvider } from '@vis.gl/react-google-maps';
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { KeyRound } from 'lucide-react';

const STORAGE_KEY = 'roamflow-google-maps-api-key';

const MapAPIProvider = ({ children }: { children: React.ReactNode }) => {
  const [apiKey, setApiKey] = useState(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '');
  const [tempKey, setTempKey] = useState('');
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

  useEffect(() => {
    // Check for a saved key in localStorage, but only on the client side.
    const savedKey = localStorage.getItem(STORAGE_KEY);
    if (savedKey) {
      setApiKey(savedKey);
    }
    setHasCheckedStorage(true);
  }, []);

  const handleSetKey = () => {
    localStorage.setItem(STORAGE_KEY, tempKey);
    setApiKey(tempKey);
  };
  
  // Don't render the input form until we've checked localStorage on the client
  if (!hasCheckedStorage) {
    return null;
  }

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
                    You can get a key from the Google Cloud Console. Make sure to enable the &quot;Maps JavaScript API&quot;.
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
          <Button onClick={handleSetKey} className="w-full" disabled={!tempKey}>
            Set Key & Load Map
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return <APIProvider apiKey={apiKey}>{children}</APIProvider>;
};

export default MapAPIProvider;
