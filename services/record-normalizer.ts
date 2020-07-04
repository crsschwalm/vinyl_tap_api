import { v4 as uuidv4 } from 'uuid';

import { Album, Track, Artist, AtLeast } from '../types';

const fillAlbumDefaults = (albumData: AtLeast<Album, 'name'>): Album => {
  const timestamp = new Date().getTime();

  return {
    id: uuidv4(),
    image: 'https://source.unsplash.com/random',
    artists: [],
    tracks: [],
    genres: [],
    createdAt: timestamp,
    ...albumData,
    updatedAt: timestamp,
  };
};

export const normalizeAlbum = (data: Partial<Album>): Album => {
  if (!data.name) {
    throw new Error('No album name supplied');
  }

  const baseAlbum = fillAlbumDefaults(data as AtLeast<Album, 'name'>);

  const tracks = baseAlbum.tracks.map(normalizeTrack);

  const artists = baseAlbum.artists.map(normalizeArtist);

  return {
    ...baseAlbum,
    tracks,
    artists,
  };
};

export const normalizeTrack = (
  trackData: Partial<Track>,
  i: number,
  tracks: Partial<Track>[],
): Track => {
  if (!trackData.name) {
    throw new Error('No track name supplied');
  }

  const artists = (trackData.artists || []).map(normalizeArtist);

  return {
    name: trackData.name,
    artists,
    track_number: trackData.track_number || tracks.length,
    duration_ms: trackData.duration_ms || 0,
    explicit: !!trackData.explicit,
  };
};

export const normalizeArtist = (artistData: Partial<Artist>): Artist => {
  if (!artistData.name) {
    throw new Error('No artist name supplied');
  }

  return artistData as Artist;
};
