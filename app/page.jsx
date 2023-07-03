import React from "react";
import MovieCard from "@components/MovieCard";
import HeroSection from "@components/HeroSection";
import Badge from "@components/ui/Badge";

const fetchUpcomingMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
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
        <h1 className="text-4xl text-center md:text-left">Now Playing</h1>
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
