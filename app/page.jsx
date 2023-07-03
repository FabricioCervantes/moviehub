import React from "react";
import MovieCard from "@components/MovieCard";
import HeroSection from "@components/HeroSection";
import Badge from "@components/ui/Badge";

const fetchUpcomingMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=a97a0e69992c3fbbfda4f5387a476249&language=en-US&page=append_to_response=videos,images, runtime`
  ).then((res) => res.json());
};

async function Home() {
  const upcomingMovies = await fetchUpcomingMovies();
  console.log(upcomingMovies);

  const movies = upcomingMovies.results.slice(0, 4);
  return (
    <>
      <HeroSection />
      <div className="text-white px-5 mt-16 flex items-center justify-between">
        <h1 className="text-4xl text-center md:text-left">Upcoming Movies</h1>
        <Badge />
      </div>
      <div className="p-5 flex flex-col md:flex-row gap-10 md:gap-0 items-center justify-between mt-10">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}

export default Home;
