import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/main.css";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    const res = await fetch(`http://localhost:5000/api/movies/search?query=${query}`);
    const data = await res.json();
    setMovies(data.results || []);
  };

  return (
    <div className="container">
      <h2> Movie Search</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter movie title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <Link to={`/movie/${movie.id}`}>
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
              )}
              <p>{movie.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;

