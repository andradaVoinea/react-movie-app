import React from "react";
import "./HomeScreen.css";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Row from "../components/Row";
import requests from "../apicalls/request";

function HomeScreen() {
  return (
    <div className="homeScreen">
      <Navbar />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending now" fetchUrl={requests.fetchTrending} />
      <Row title="Top rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumantaries} />
    </div>
  );
}

export default HomeScreen;
