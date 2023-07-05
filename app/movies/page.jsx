"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import MovieCard from "@components/MovieCard";
import { motion } from "framer-motion";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  const fetchGenre = () => {
    return fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=a97a0e69992c3fbbfda4f5387a476249`
    ).then((res) => res.json());
  };

  const fetchUpcomingMovies = (genre) => {
    return fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1&with_genres=${genre}`
    ).then((res) => res.json());
  };

  const fetchPopularMovies = async () => {
    const test = await fetchGenre();
    const upcomingMovies = await fetchUpcomingMovies(28);
    setMovies(upcomingMovies.results);
    setGenre(test.genres);
  };

  //set movies to upcoming movies
  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <div className="text-white p-5">
      <div className="flex flex-wrap justify-center gap-5">
        {genre.map((item) => (
          <Badge
            className="bg-red-500 px-6 py-2 text-xl text-black hover:bg-red-500 hover:cursor-pointer"
            variant="default"
            onClick={() => {
              fetchUpcomingMovies(item.id).then((res) =>
                setMovies(res.results)
              );
            }}
          >
            {item.name}
          </Badge>
        ))}
      </div>
      <div className="h-[60vh] md:flex mt-10">
        <div className="flex flex-col justify-center gap-20 h-full w-fit">
          <h1 className="text-4xl hover:cursor-pointer hover:text-red-500">
            Trending
          </h1>
          <h1 className="text-4xl hover:cursor-pointer hover:text-red-500">
            Popular
          </h1>
          <h1 className="text-4xl hover:cursor-pointer hover:text-red-500">
            Top Rated
          </h1>
        </div>
        <div className="grid md:grid-cols-4 gap-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
