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
  const handleGenre = (value) => {
    setSelectedGenre(value);
    setPage(1);
    fetchMovies();
  };

  const handleSort = (value) => {
    setSort(value);
    setPage(1);
    fetchMovies();
  };

  return (
    <>
      <div className="text-white p-5">
        <div className="flex justify-end gap-5">
          <Select onValueChange={(e) => handleGenre(e)}>
            <SelectTrigger className="w-[180px] border-2">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              {genre.map((item) => (
                <SelectItem value={item.id}>{item.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(e) => handleSort(e)}>
            <SelectTrigger className="w-[180px] border-2">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity.desc">Trending</SelectItem>
              <SelectItem value="vote_count.desc">Popular</SelectItem>
              <SelectItem value="popularity.desc">Top Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-center mt-10">
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
