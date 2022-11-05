import React, { useEffect, useState } from "react";
import axios from "../apicalls/axios";
import requests from "../apicalls/request";
import "./Banner.css";
import movieTrailer from "movie-trailer";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
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
  const handleClick = (movie) => {
    if (trailerUrl) {
      // if there is an open trailer, then I want to close it (set it to empty "")
      setTrailerUrl("");
    } else {
      //try and find an youtube trailer according to name
      movieTrailer(
        movie?.title ||
          movie?.name ||
          movie?.original_name ||
          movie?.original_title ||
          ""
      )
        .then((url) => {
          console.log(
            movie?.title ||
              movie?.name ||
              movie?.original_name ||
              movie?.original_title ||
              ""
          );
          console.log(movie);
          console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

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
          <button onClick={handleClick} className="banner_button">
            Play
          </button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner-fadeBottom" />
    </header>
  );
}

export default Banner;
