const axios = require('axios');
require('dotenv').config();

const wipeAllAlbums = async () => {
  try {
    const { data: albums } = await axios.get(
      `${process.env.API_URL}/${process.env.STAGE}/records`,
    );

    const requests = albums.map(({ id }) =>
      axios.delete(`${process.env.API_URL}/${process.env.STAGE}/records/${id}`),
    );

    await Promise.all(requests);
  } catch (e) {
    console.log('Error wiping data :>> ', e);
  }
};

wipeAllAlbums();
