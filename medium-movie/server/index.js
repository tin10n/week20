// server/index.js
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const searchMovies = require("./utils/search");
const similarMovies = require("./utils/similar");

dotenv.config();
const app = express();
app.use(cors()); // Allow requests from Vite frontend

const PORT = process.env.PORT || 5000;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

if (!TMDB_API_KEY) {
  console.error("Missing TMDB_API_KEY in .env");
  process.exit(1);
}

// 🔍 Search route
app.get("/api/movies/search", async (req, res) => {
  try {
    const { query, page } = req.query;
    if (!query) return res.status(400).json({ error: "Missing query parameter" });

    const data = await searchMovies(query, page || 1, TMDB_API_KEY);
    res.json(data);
  } catch (err) {
    console.error("Search error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Similar movies route
app.get("/api/movies/similar", async (req, res) => {
  try {
    const { movieId, page } = req.query;
    if (!movieId) return res.status(400).json({ error: "Missing movieId parameter" });

    const data = await similarMovies(movieId, page || 1, TMDB_API_KEY);
    res.json(data);
  } catch (err) {
    console.error("Similar error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
