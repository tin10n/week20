const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const searchMovies = async (query, page = 1, apiKey) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=${page}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) throw new Error(data.status_message || "Error fetching movies");
  return data;
};

module.exports = searchMovies;
