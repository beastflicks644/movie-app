import React from 'react';

export default function About() {
  return (
    <section className="page">
      <h2>About</h2>
      <p>
        CineScope is a React-based movie listing app demonstrating components, props/state, hooks,
        routing, HOCs, CSS modules, and Context API for a watchlist. Data can be fetched from TMDb
        or local JSON for offline evaluation.
      </p>
    </section>
  );
}