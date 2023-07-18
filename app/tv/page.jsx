"use client";

import { useEffect, useState } from "react";
import DisplayMedia from "@components/DisplayMedia";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const tv = () => {
  const [shows, setShows] = useState([]);
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("vote_count.desc");

  const pag = Array.from(Array(5).keys()).map((i) => i + 1);

  const fetchGenre = () => {
    return fetch(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=a97a0e69992c3fbbfda4f5387a476249`
    ).then((res) => res.json());
  };

  const fetchUpcomingShows = () => {
    return fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${page}&with_genres=${selectedGenre}&sort_by=${sort}`
    ).then((res) => res.json());
  };

  const fetchShows = async () => {
    const test = await fetchGenre();
    const upcomingMovies = await fetchUpcomingShows();
    setShows(upcomingMovies.results);
    setGenre(test.genres);
  };

  const handlePage = (item) => {
    setPage(item);
    fetchShows();
  };
  const handleGenre = (value) => {
    setSelectedGenre(value);
    setPage(1);
    fetchShows();
  };

  const handleSort = (value) => {
    setSort(value);
    setPage(1);
    fetchShows();
  };

  useEffect(() => {
    fetchShows();
  }, [sort, page, selectedGenre]);

  console.log(shows);
  return (
    <>
      <div className="flex text-white px-5 justify-end gap-5">
        <Select onValueChange={(e) => handleGenre(e)}>
          <SelectTrigger className="w-[180px] border-2">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            {genre.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
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
            <SelectItem value="revenue.desc">Box Office</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DisplayMedia media={shows} type="shows" />
      <div className="flex justify-end gap-5 p-2 mt-5">
        {pag.map((item) => (
          <p
            key={item}
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
    </>
  );
};

export default tv;