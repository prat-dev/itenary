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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { importDestinations } from '@/ai/flows/destination-importer';
import { Loader2 } from 'lucide-react';

type DestinationImporterProps = {
  onImport: (destinations: string[]) => void;
  children: React.ReactNode;
};

export default function DestinationImporter({ onImport, children }: DestinationImporterProps) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleImport = () => {
    startTransition(async () => {
      try {
        const result = await importDestinations({ text });
        if (result && result.destinations.length > 0) {
          onImport(result.destinations);
          toast({
            title: 'Success!',
            description: `${result.destinations.length} destinations have been imported.`,
          });
          setOpen(false);
          setText('');
        } else {
            toast({
                title: 'No destinations found',
                description: 'We couldn\'t find any destinations in the text you provided.',
                variant: 'destructive',
            });
        }
      } catch (error) {
        toast({
          title: 'Error importing destinations',
          description: 'An unexpected error occurred. Please try again.',
          variant: 'destructive',
        });
        console.error(error);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import Destinations</DialogTitle>
          <DialogDescription>
            Paste a list of destinations, each on a new line. We&apos;ll do the rest.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="e.g.&#10;Paris, France&#10;Rome, Italy&#10;Tokyo, Japan"
            className="min-h-[150px]"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleImport} disabled={isPending || !text.trim()}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
