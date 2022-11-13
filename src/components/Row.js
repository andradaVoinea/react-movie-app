import React, { useState } from "react";
import { useEffectOnce } from "../customHooks/customHooks";
import axios from "../apicalls/axios";
import "./Row.css";
import YouTube from "react-youtube";
import { getTrailerUrlParams } from "../apicalls/trailerUrlParams";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const base_url = "https://image.tmdb.org/t/p/original/";

  //when this row loads we make a request to tmdb and pull the movie information
  useEffectOnce(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]); //if you use an outside variable you have to include it in useEffect -> dependencies

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = async (movie) => {
    if (trailerUrl) {
      // if there is an open trailer, then I want to close it (set it to empty "")
      setTrailerUrl("");
    } else {
      //play trailer
      try {
        const urlParams = await getTrailerUrlParams(movie);
        setTrailerUrl(urlParams.get("v"));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {/* several row_posters */}
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                key={movie.id}
                onClick={() => handleClick(movie)}
                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path //using a thumbnail as image instead of poster
                }`}
                alt={movie.name}
              />
            )
        )}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
