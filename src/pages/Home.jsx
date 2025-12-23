import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="page">
      <h1>Welcome to CineScope</h1>
      <p>
        Discover popular movies, search titles, filter by genre, and manage your watchlist.
        
      </p>
      <Link className="primary-btn" to="/movies">Explore Movies</Link>
    </section>
  );
}