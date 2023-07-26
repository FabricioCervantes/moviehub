"use client";
import MovieCard from "@components/Card";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DisplayMedia = ({ media, type, fetchTest, genreTest }) => {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(28);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("popularity.desc");

  const pag = Array.from(Array(5).keys()).map((i) => i + 1);

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

  const fetchMovies = async () => {
    const data = await fetchTest;
    setMovies(data.results);
  };

  const fetchGenres = async () => {
    const data = await genreTest;
    setGenre(data.genres);
  };

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, [movies, genre]);

  return (
    <>
      <>
        <div className="flex text-white px-5 justify-end gap-5">
          <Select onValueChange={(e) => handleGenre(e)}>
            <SelectTrigger className="w-[180px] border-2">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              {genre &&
                genre.map((item) => (
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
        <div className="text-white p-5">
          <div className="flex justify-center mt-10">
            <div className="grid md:grid-cols-4 gap-5">
              {movies.map((movie) => (
                <div key={movie.id}>
                  <MovieCard movie={movie} type={type} />
                </div>
              ))}
            </div>
          </div>
        </div>
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
    </>
  );
};

export default DisplayMedia;
