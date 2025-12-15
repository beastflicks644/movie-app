import React from 'react';
import MovieCard from '../components/MovieCard';
import { useWatchlist } from '../context/WatchlistContext';

export default function Wishlist() {
  const { watchlist } = useWatchlist();

  return (
    <section className="page">
      <h2>My Wishlist</h2>
      {watchlist.length === 0 ? (
        <div className="center">No movies in your wishlist yet.</div>
      ) : (
        <div className="grid">
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}