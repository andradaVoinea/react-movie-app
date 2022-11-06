import React, { useEffect, useState } from "react";
import { getTrailerUrlParams } from "../apicalls/trailerUrlParams";
import axios from "../apicalls/axios";
import requests from "../apicalls/request";
import YouTube from "react-youtube";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  useEffect(() => {
    //piece of code that runs on a specific condition
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []); //empty array it means it runs once, when the Banner component mounts
  console.log(movie);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  async function playTrailer(movie) {
    if (trailerUrl) {
      // if there is an open trailer, then I want to close it (set it to empty "")
      setTrailerUrl("");
    } else {
      try {
        const urlParams = await getTrailerUrlParams(movie);
        setTrailerUrl(urlParams.get("v"));
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        {/* title */}
        {/* optional chaining */}
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button" onClick={() => playTrailer(movie)}>
            Play
          </button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner-fadeBottom" />
      <div>{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}</div>
    </header>
  );
}

export default Banner;
