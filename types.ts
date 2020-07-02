export type Artist = {
  name: string;
  bio?: string;
};

export type Track = {
  track_number: number;
  name: string;
  artists: Artist[];
  duration_ms?: number;
  explicit?: boolean;
};

export type Album = {
  id: string;
  name: string;
  artists: Artist[];
  tracks: Track[];
  createdAt: number;
  updatedAt: number;
  image: string;
  genres: string[];
};

export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;
