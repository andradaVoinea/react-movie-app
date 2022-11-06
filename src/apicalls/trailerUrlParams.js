import movieTrailer from "movie-trailer";

const getTrailerUrlParams = async (movie) => {
  let url = null;
  //try and find an youtube trailer according to name
  const res = await movieTrailer(
    movie?.title ||
      movie?.name ||
      movie?.original_name ||
      movie?.original_title ||
      ""
  );
  if (res == null) {
    url = await movieTrailer(
      movie?.title ||
        movie?.name ||
        movie?.original_name ||
        movie?.original_title ||
        "",
      { videoType: "tv" }
    );
  } else {
    url = res;
  }
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
  return urlParams;
};

export { getTrailerUrlParams };
