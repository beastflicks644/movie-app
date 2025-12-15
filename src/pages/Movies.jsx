import React, { useEffect, useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import MovieCard from '../components/MovieCard';
import withLoading from '../hoc/withLoading';
import { fetchPopularMovies, searchMovies } from '../api/movieapi';

const MOVIES_PER_PAGE = 6; // 👈 only 6 movies per page

// Movie list component
const MovieList = ({ movies }) => {
  return (
    <div className="grid">
      {movies.length === 0 ? (
        <div className="center">No movies found.</div>
      ) : (
        movies.map((m) => <MovieCard key={m.id} movie={m} />)
      )}
    </div>
  );
};

const MovieListWithLoading = withLoading(MovieList);

export default function Movies() {
  const [genre, setGenre] = useState('All');
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [pageInfo, setPageInfo] = useState({ page: 1 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter movies by genre
 const filteredMovies = useMemo(() => {
  if (genre === 'All') return movies;
  return movies.filter((m) => m.genre === genre);
}, [movies, genre]);

  // Slice movies for current page
  const paginatedMovies = useMemo(() => {
    const start = (pageInfo.page - 1) * MOVIES_PER_PAGE;
    return filteredMovies.slice(start, start + MOVIES_PER_PAGE);
  }, [filteredMovies, pageInfo.page]);

  const totalPages = Math.ceil(filteredMovies.length / MOVIES_PER_PAGE);

  // Load popular movies
  const loadPopular = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchPopularMovies();
      setMovies(data.results || []);
      setPageInfo({ page: 1 }); // reset to first page
    } catch (err) {
      setError(err.message || 'Failed to fetch popular movies');
    } finally {
      setIsLoading(false);
    }
  };

  // Search movies
  const onSearch = async (q) => {
    setQuery(q);
    if (!q) return loadPopular();
    setIsLoading(true);
    setError(null);
    try {
      const data = await searchMovies(q);
      setMovies(data.results || []);
      setPageInfo({ page: 1 }); // reset to first page
    } catch (err) {
      setError(err.message || 'Failed to search');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPopular();
  }, []);

  return (
    <section className="page">
      <h2>Movies</h2>
      <div className="controls">
        <SearchBar onSearch={onSearch} />
        <Filter genre={genre} onChange={setGenre} />
      </div>

      <MovieListWithLoading
        isLoading={isLoading}
        error={error}
        movies={paginatedMovies}
      />

      <div className="pagination">
        <button
          disabled={pageInfo.page <= 1}
          onClick={() => setPageInfo((p) => ({ page: p.page - 1 }))}
        >
          Prev
        </button>
        <span>
          Page {pageInfo.page} / {totalPages}
        </span>
        <button
          disabled={pageInfo.page >= totalPages}
          onClick={() => setPageInfo((p) => ({ page: p.page + 1 }))}
        >
          Next
        </button>
      </div>
    </section>
  );
}