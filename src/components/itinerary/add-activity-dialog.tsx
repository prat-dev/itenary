'use client';

import { useState, useTransition } from 'react';
import type { Activity, Destination } from '@/lib/types';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { generateActivity } from '@/ai/flows/generate-activity';
import { Loader2 } from 'lucide-react';

type AddActivityDialogProps = {
  destination: Destination;
  onAddActivity: (destinationId: string, activity: Omit<Activity, 'id' | 'date'>) => void;
  children: React.ReactNode;
};

export default function AddActivityDialog({ destination, onAddActivity, children }: AddActivityDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = () => {
    startTransition(async () => {
      try {
        const result = await generateActivity({ name, destination: destination.name });
        const newActivity = {
          name,
          description: result.description,
          photo: `https://placehold.co/400x400.png`, // We'll add a data-ai-hint to the image later
        };
        
        onAddActivity(destination.id, newActivity);
        
        toast({
          title: 'Activity Added!',
          description: `"${name}" has been added to ${destination.name}.`,
        });
        setOpen(false);
        setName('');
      } catch (error) {
        console.error('Error generating activity:', error);
        toast({
          title: 'Error',
          description: 'Could not generate activity details. Please try again.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Activity to {destination.name}</DialogTitle>
          <DialogDescription>
            Just give your activity a name, and we'll generate the rest.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Activity Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="e.g., Visit the Eiffel Tower"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={isPending || !name.trim()}>
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Add Activity'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
