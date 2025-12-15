import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/MovieCard.module.css';
import { useWatchlist } from '../context/WatchlistContext';
import { getPosterUrl } from '../api/movieapi';

export default function MovieCard({ movie }) {
  const { addToWatchlist, watchlist, removeFromWatchlist } = useWatchlist();
  const inWatchlist = watchlist.some((m) => m.id === movie.id);

  const poster = movie.poster_path ? getPosterUrl(movie.poster_path) : '';

  const handleToggle = () => {
    if (inWatchlist) removeFromWatchlist(movie.id);
    else addToWatchlist(movie);
  };

  return (
    <div className={styles.card}>
      {poster ? (
        <img className={styles.poster} src={poster} alt={movie.title} />
      ) : (
        <div className={styles.placeholder}>No Image</div>
      )}

      <div className={styles.content}>
        <h3 className={styles.title}>
          <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
        </h3>
        <p className={styles.meta}>
          <span className={styles.label}>Rating:</span> {movie.vote_average || 'N/A'}
        </p>
        <p className={styles.overview}>
          {movie.overview ? movie.overview.slice(0, 120) + '...' : 'No overview available.'}
        </p>

        <div className={styles.actions}>
          <button onClick={handleToggle}>
            {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </button>
          <Link className={styles.detailsBtn} to={`/movies/${movie.id}`}>
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}