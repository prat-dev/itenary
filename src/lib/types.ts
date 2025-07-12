export type Activity = {
  id: string;
  name: string;
  description: string;
  photo: string;
  date: string;
};

export type Destination = {
  id: string;
  name: string;
  activities: Activity[];
  location: {
    lat: number;
    lng: number;
  };
};

export type Itinerary = {
  id: string;
  name: string;
  tripType: 'adventure' | 'leisure' | 'work';
  destinations: Destination[];
  isFavorite: boolean;
};
