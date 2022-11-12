const API_KEY = process.env.REACT_APP_API_KEY;

//inserting the API_KEY where we need it in the requests that were given from TMDB for different genres of movies
const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumantaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};
export default requests;
// it concatenates the base url from axios file with the requests that contain the API KEY
// https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US
