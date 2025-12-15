import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import About from './pages/About';
import Wishlist from './pages/Wishlist';

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/movies" element={<Movies />} />
  <Route path="/movies/:id" element={<MovieDetail />} />
  <Route path="/about" element={<About />} />
  <Route path="/wishlist" element={<Wishlist />} />   {/* 👈 new route */}
</Routes>

function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </>
  );
}

export default App;