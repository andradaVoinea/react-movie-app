import React, { useEffect, useState } from "react";
import { getTrailerUrlParams } from "../apicalls/trailerUrlParams";
import axios from "../apicalls/axios";
import requests from "../apicalls/request";
import YouTube from "react-youtube";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import "./Banner.css";

function Banner() {
  //fetch a movie from the TMDB, store it and use it in the banner section
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  //how to display the trailer
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

  //if text is longer than n characters (150 characters), replace remaining text with "..."
  //the "?" is in case you get an udenfined answer from the API call
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
          {movie?.title ||
            movie?.name ||
            movie?.original_name ||
            movie?.original_title}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button" onClick={() => playTrailer(movie)}>
            Play
            <span>
              <FaPlay />
            </span>
          </button>
          <button
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            className="banner_button"
          >
            More info{" "}
            <span>
              <AiOutlineInfoCircle />{" "}
            </span>
          </button>
          {isHovering && (
            <div className="banner_hoverInfo">
              <div>First air date: {movie?.first_air_date}</div>
              <div> Popularity score: {movie?.popularity}</div>
              <div> User score: {movie?.vote_average}</div>
              <div> Vote count/day: {movie?.vote_count}</div>
            </div>
          )}
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner-fadeBottom" />
      <div>
        {/* where to display the trailer */}
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </header>
  );
}

export default Banner;
