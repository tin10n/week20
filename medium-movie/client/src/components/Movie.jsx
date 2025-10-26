import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/main.css";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_TMDB_API_KEY`);
      const data = await res.json();
      setMovie(data);
    };

    const fetchSimilar = async () => {
      const res = await fetch(`http://localhost:5000/api/movies/similar?movieId=${id}`);
      const data = await res.json();
      setSimilar(data.results || []);
    };

    fetchMovie();
    fetchSimilar();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="detail-container">
      <Link to="/" className="back-link">← Back to search</Link>
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>

      <h3>Similar Movies</h3>
      <div className="movie-list">
        {similar.map((m) => (
          <div key={m.id} className="movie-item">
            <Link to={`/movie/${m.id}`}>
              <img src={`https://image.tmdb.org/t/p/w200${m.poster_path}`} alt={m.title} />
              <p>{m.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieDetail;

