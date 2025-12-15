import axios from 'axios';
import localData from '../data/sample.json';

const apiKey = process.env.REACT_APP_TMDB_API_KEY;
const baseUrl = process.env.REACT_APP_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const imageBase = process.env.REACT_APP_TMDB_IMAGE_BASE || 'https://image.tmdb.org/t/p/w500';

// Toggle to use local JSON if API not set
const USE_LOCAL = !apiKey;

export async function fetchPopularMovies(page = 1) {
  if (USE_LOCAL) {
    return { results: localData.results, total_pages: 1, page: 1 };
  }
  const { data } = await axios.get(`${baseUrl}/movie/popular`, {
    params: { api_key: apiKey, page }
  });
  return data;
}

export async function searchMovies(query, page = 1) {
  if (USE_LOCAL) {
    const filtered = localData.results.filter((m) =>
      m.title.toLowerCase().includes(query.toLowerCase())
    );
    return { results: filtered, total_pages: 1, page: 1 };
  }
  const { data } = await axios.get(`${baseUrl}/search/movie`, {
    params: { api_key: apiKey, query, page }
  });
  return data;
}

export async function fetchMovieById(id) {
  if (USE_LOCAL) {
    const movie = localData.results.find((m) => String(m.id) === String(id));
    return movie || null;
  }
  const { data } = await axios.get(`${baseUrl}/movie/${id}`, {
    params: { api_key: apiKey, append_to_response: 'videos,images'
    }
  });
  return data;
}

export function getPosterUrl(path) {
  if (!path) return '';
  return `${imageBase}${path}`;
}