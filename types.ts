export interface Artist {
  id: string;
  name: string;
  bio: string;
}

export interface Track {
  artists: Artist[];
  duration_ms: number;
  explicit: boolean;
  name: string;
  track_number: number;
}

export interface Album {
  id: string;
  artists: Artist[];
  genres: any[];
  name: string;
  tracks: Track;
  image: string;
}
