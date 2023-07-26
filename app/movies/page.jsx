import DisplayMedia from "@components/DisplayMedia";

const Movies = async () => {
  const fetchUpcomingMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
    );
    const data = await res.json();
    return data;
  };

  const movies = await fetchUpcomingMovies();

  // const fetchGenre = async () => {
  //   const res = await fetch(
  //     `https://api.themoviedb.org/3/genre/movie/list?api_key=a97a0e69992c3fbbfda4f5387a476249`
  //   );
  //   const data = await res.json();
  //   return data;
  // };

  return (
    <>
      <DisplayMedia
        fetchTest={fetchUpcomingMovies()}
        movies={movies.results}
        // genreTest={fetchGenre()}
        type="movie"
      />
    </>
  );
};

export default Movies;
