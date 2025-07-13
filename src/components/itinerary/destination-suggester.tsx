'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { suggestDestinations } from '@/ai/flows/suggest-destinations';
import type { Itinerary } from '@/lib/types';
import { Check, Loader2, Plus } from 'lucide-react';

type DestinationSuggesterProps = {
  itinerary: Itinerary;
  onSuggest: (destinations: string[]) => void;
  children: React.ReactNode;
};

export default function DestinationSuggester({ itinerary, onSuggest, children }: DestinationSuggesterProps) {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [reasoning, setReasoning] = useState('');
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGetSuggestions = () => {
    startTransition(async () => {
      setSuggestions([]);
      setReasoning('');
      setSelectedSuggestions([]);
      try {
        const itineraryText = itinerary.destinations.map(d => d.name).join(', ');
        const result = await suggestDestinations({
          itinerary: itineraryText,
          tripType: itinerary.tripType,
        });
        if (result && result.destinations.length > 0) {
          setSuggestions(result.destinations);
          setReasoning(result.reasoning);
        } else {
          toast({
            title: 'No suggestions found',
            description: 'We couldn\'t come up with any suggestions at this time.',
            variant: 'destructive',
          });
        }
      } catch (error) {
        toast({
          title: 'Error getting suggestions',
          description: 'An unexpected error occurred. Please try again.',
          variant: 'destructive',
        });
        console.error(error);
      }
    });
  };

  const handleToggleSuggestion = (suggestion: string) => {
    setSelectedSuggestions(prev =>
      prev.includes(suggestion) ? prev.filter(s => s !== suggestion) : [...prev, suggestion]
    );
  };

  const handleAddSuggestions = () => {
    onSuggest(selectedSuggestions);
    toast({
      title: 'Success!',
      description: `${selectedSuggestions.length} destinations have been added.`,
    });
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={handleGetSuggestions}>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Smart Destination Suggestions</DialogTitle>
          <DialogDescription>
            Based on your itinerary, here are a few ideas for your next stop.
          </DialogDescription>
        </DialogHeader>
        {isPending ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="py-4 space-y-4">
            <div className="space-y-2">
                {suggestions.map(suggestion => (
                    <Button
                        key={suggestion}
                        variant="outline"
                        className="w-full justify-between"
                        onClick={() => handleToggleSuggestion(suggestion)}
                    >
                        {suggestion}
                        {selectedSuggestions.includes(suggestion) && <Check className="h-4 w-4 text-green-500" />}
                    </Button>
                ))}
            </div>
            {reasoning && <p className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-lg">{reasoning}</p>}
          </div>
        )}
        <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleAddSuggestions} disabled={selectedSuggestions.length === 0}>
                <Plus className="mr-2 h-4 w-4"/> Add Selected
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
