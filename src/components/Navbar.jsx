import { Link, NavLink } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
<NavLink to="/wishlist">Wishlist</NavLink>

export default function Navbar() {
  const { watchlist } = useWatchlist();
  return (
    <header className="navbar">
      <Link to="/" className="brand">CineScope</Link>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      <div className="watchlist-badge">Watchlist: {watchlist.length}</div>
    </header>
  );
}