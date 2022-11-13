import movieTrailer from "movie-trailer";

const getTrailerUrlParams = async (movie) => {
  let url = null;
  //try and find an youtube trailer according to name
  const res = await movieTrailer(
    movie?.name ||
      movie?.title ||
      movie?.original_name ||
      movie?.original_title ||
      ""
  );
  if (res == null) {
    url = await movieTrailer(
      movie?.name ||
        movie?.title ||
        movie?.original_name ||
        movie?.original_title ||
        "",
      { videoType: "tv" }
    );
  } else {
    url = res;
  }
  console.log(
    movie?.name ||
      movie?.title ||
      movie?.original_name ||
      movie?.original_title ||
      ""
  );
  //get the video id, after the ? in the URL so we can do a get method
  const urlParams = new URLSearchParams(new URL(url).search);
  return urlParams;
};

export { getTrailerUrlParams };
