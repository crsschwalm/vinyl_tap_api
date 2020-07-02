import { mockData } from '../assets/spotify-albums';
import { AtLeast, Album } from '../types';

const axios = require('axios');
require('dotenv').config();

const albums = ({ spotifyAlbums } = mockData): AtLeast<
  Album,
  'name' | 'artists' | 'tracks' | 'image' | 'genres'
>[] =>
  spotifyAlbums.map((album) => ({
    name: album.name,
    image: album.images[0].url,
    genres: album.genres,
    artists: album.artists.map(({ name }) => ({ name })),
    tracks: (album.tracks.items as any[]).map((track) => ({
      track_number: track.track_number,
      name: track.name,
      artists: album.artists.map(({ name }) => ({ name })),
      duration_ms: track.duration_ms,
      explicit: track.explicit,
    })),
  }));

const seedData = async () => {
  try {
    const requests = albums().map((album) =>
      axios
        .post(`${process.env.API_URL}/${process.env.STAGE}/records`, album)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        }),
    );

    await Promise.all(requests);
  } catch (e) {
    console.log('Error Seeding Data :>> ', e);
  }
};

seedData();
