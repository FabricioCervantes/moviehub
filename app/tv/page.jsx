"use client";

import { useEffect, useState } from "react";
import DisplayMedia from "@components/DisplayMedia";
const tv = () => {
  const [shows, setShows] = useState([]);
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(28);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("vote_count.desc");

  const fetchGenre = () => {
    return fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=a97a0e69992c3fbbfda4f5387a476249`
    ).then((res) => res.json());
  };

  const fetchUpcomingMovies = () => {
    return fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${page}&sort_by=${sort}`
    ).then((res) => res.json());
  };

  const fetchMovies = async () => {
    const test = await fetchGenre();
    const upcomingMovies = await fetchUpcomingMovies();
    setShows(upcomingMovies.results);
    setGenre(test.genres);
  };

  useEffect(() => {
    fetchMovies();
  }, [sort, page, selectedGenre]);

  console.log(shows);
  return (
    <div>
      <DisplayMedia media={shows} type="shows" />
    </div>
  );
};

export default tv;
