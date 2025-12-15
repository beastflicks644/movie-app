import React from 'react';

// For local data demo, we use a simple genre filter by keyword matching.
// With TMDb, you’d fetch /genre/movie/list and map by IDs.
const GENRES = ['All', 'Action', 'Comedy', 'Drama', 'Sci-Fi', 'Thriller','Romantic'];

export default function Filter({ genre, onChange }) {
  return (
    <div className="filter">
      <label htmlFor="genre">Genre: </label>
      <select id="genre" value={genre} onChange={(e) => onChange(e.target.value)}>
        {GENRES.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
    </div>
  );
}