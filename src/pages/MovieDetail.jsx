import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieById, getPosterUrl } from '../api/movieapi';
import { useWatchlist } from '../context/WatchlistContext';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addToWatchlist, removeFromWatchlist, watchlist } = useWatchlist();

  const inWatchlist = watchlist.some((m) => String(m.id) === String(id));

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMovieById(id);
        if (mounted) setMovie(data);
      } finally {
        setIsLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [id]);

  const toggleWatchlist = () => {
    if (!movie) return;
    if (inWatchlist) removeFromWatchlist(movie.id);
    else addToWatchlist(movie);
  };

  if (isLoading) return <div className="center">Loading...</div>;
  if (!movie) return <div className="center">Movie not found.</div>;

  const poster = movie.poster_path ? getPosterUrl(movie.poster_path) : '';
  return (
    <section className="page">
      <Link to="/movies" className="back-link">← Back to Movies</Link>
      <div className="detail">
        {poster ? <img src={poster} alt={movie.title} /> : <div className="placeholder detail">No Image</div>}
        <div className="detail-content">
          <h2>{movie.title}</h2>
          <p><strong>Release date:</strong> {movie.release_date || 'N/A'}</p>
          <p><strong>Rating:</strong> {movie.vote_average || 'N/A'}</p>
          <p className="overview">{movie.overview || 'No overview available.'}</p>
          <button onClick={toggleWatchlist}>
            {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </button>
        </div>
      </div>
    </section>
  );
}