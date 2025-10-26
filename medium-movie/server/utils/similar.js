const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const similarMovies = async (movieId, page = 1, apiKey) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}&page=${page}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) throw new Error(data.status_message || "Error fetching similar movies");
  return data;
};

module.exports = similarMovies;
