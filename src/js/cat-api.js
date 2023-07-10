'use strict';
export { fetchBreeds, fetchCatByBreed };

const API_KEY =
  'live_3bAFCqVANRjiTXZy3vcsKT6qUXFpjKifFDbA2af3bBoAOdP8f57GINIpMktnE16f';
const BASE_CATS_URL = 'https://api.thecatapi.com/v1/breeds';
const CAT_IMAGE_KEY = 'https://api.thecatapi.com/v1/images/search';

const options = {
  Headers: {
    'x-api-key': API_KEY,
  },
};

function fetchBreeds() {
  return fetch(BASE_CATS_URL, options).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });
}
function fetchCatByBreed(breedId) {
  return fetch(`${CAT_IMAGE_KEY}?breed_ids=${breedId}&api_key=${API_KEY}`).then(
    res => {
      return res.json();
    }
  );
}
