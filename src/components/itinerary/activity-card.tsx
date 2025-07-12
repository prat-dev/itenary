'use client';

import type { DragEventHandler } from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { Activity } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { GripVertical } from 'lucide-react';
import { Badge } from '../ui/badge';
import { format } from 'date-fns';

type ActivityCardProps = {
  activity: Activity;
  draggable?: boolean;
  onDragStart?: DragEventHandler<HTMLDivElement>;
};

export default function ActivityCard({ activity, draggable, onDragStart }: ActivityCardProps) {
  const aiHint = activity.name.toLowerCase().split(' ').slice(0, 2).join(' ');
  const [photoUrl, setPhotoUrl] = useState(activity.photo);

  useEffect(() => {
    // To avoid hydration errors, we ensure random placeholders are generated only on the client.
    if (activity.photo.includes('placehold.co')) {
      const random = Math.floor(Math.random() * 100);
      setPhotoUrl(`https://placehold.co/400x400.png?id=${random}`);
    }
  }, [activity.photo]);

  return (
    <Card
      className="group transition-all duration-300 ease-in-out hover:shadow-md"
      draggable={draggable}
      onDragStart={onDragStart}
    >
      <CardContent className="p-3 flex items-start gap-4">
        <Image
          src={photoUrl}
          alt={activity.name}
          width={120}
          height={120}
          className="rounded-md object-cover aspect-square"
          data-ai-hint={aiHint}
        />
        <div className="flex-1">
          <h3 className="font-semibold text-base">{activity.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
          <Badge variant="outline" className="mt-2 font-mono">
            {format(new Date(activity.date), 'MMM dd, yyyy')}
          </Badge>
        </div>
        {draggable && (
          <div className="p-2 cursor-move text-muted-foreground group-hover:text-foreground transition-colors">
            <GripVertical className="h-5 w-5" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
