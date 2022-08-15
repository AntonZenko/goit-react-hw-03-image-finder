import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const KEY = '28189660-1bf5afecd196ca106a3e3c887';

async function getImages(query, page) {
  const SEARCH_PARAMS = {
    key: KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page,
    q: query,
  };

  const response = await axios.get(API_URL, {
    params: SEARCH_PARAMS,
  });

  return response.data;
}

export default getImages;
