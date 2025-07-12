import { RoamFlowLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlusCircle, Search } from 'lucide-react';
import { Input } from './ui/input';

export default function AppHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <RoamFlowLogo />
        <div className="relative ml-4 hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search itineraries..." className="pl-8 w-64" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="h-5 w-5" />
        </Button>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground hidden sm:flex">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Itinerary
        </Button>
        <Avatar>
          <AvatarImage src="https://placehold.co/40x40.png" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
