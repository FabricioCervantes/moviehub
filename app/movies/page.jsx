"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import MovieCard from "@components/MovieCard";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { set } from "mongoose";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(28);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("popularity.desc");

  const pag = Array.from(Array(5).keys()).map((i) => i + 1);

  const fetchGenre = () => {
    return fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=a97a0e69992c3fbbfda4f5387a476249`
    ).then((res) => res.json());
  };

  const fetchUpcomingMovies = () => {
    console.log("Genre: " + genre);
    console.log("Sort: " + sort);
    console.log("Page: " + page);

    return fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${page}&with_genres=${selectedGenre}&sort_by=${sort}`
    ).then((res) => res.json());
  };

  const fetchMovies = async () => {
    const test = await fetchGenre();
    const upcomingMovies = await fetchUpcomingMovies();
    setMovies(upcomingMovies.results);
    setGenre(test.genres);
  };

  useEffect(() => {
    fetchMovies();
  }, [sort, page, selectedGenre]);

  const handlePage = (item) => {
    setPage(item);
    fetchMovies();
  };
  const test = (value) => {
    setSelectedGenre(value);
    setPage(1);
    fetchMovies();
  };

  return (
    <>
      <div className="text-white p-5">
        <div className="flex flex-wrap justify-end gap-5">
          <Select onValueChange={(e) => test(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              {genre.map((item) => (
                <SelectItem value={item.id}>{item.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="md:flex mt-10">
          <div className="flex flex-col justify-center gap-20 h-full w-fit">
            <h1
              onClick={() => {
                setSort("popularity.desc");
                setPage(1);
                fetchUpcomingMovies().then((res) => {
                  setMovies(res.results);
                });
              }}
              className="text-4xl hover:cursor-pointer hover:text-red-500"
            >
              Trending
            </h1>
            <h1
              onClick={() => {
                setSort("vote_count.desc");
                setPage(1);
                fetchUpcomingMovies().then((res) => {
                  setMovies(res.results);
                });
              }}
              className="text-4xl hover:cursor-pointer hover:text-red-500"
            >
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
        <div className="flex justify-end gap-5 p-2 mt-5">
          {pag.map((item) => (
            <p
              onClick={() => {
                handlePage(item);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              //check if page is active
              className={`${
                page === item ? "bg-red-500" : "bg-gray-500"
              } px-5 py-2 rounded-md hover:cursor-pointer hover:bg-red-500 hover:text-white`}
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Movies;
