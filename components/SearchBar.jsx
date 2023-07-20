import { set } from "mongoose";
import React from "react";
import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SearchBar = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [data, setData] = useState([]);

  const fetchUpcomingMovies = () => {
    return fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
    ).then((res) => res.json());
  };

  async function Home() {
    const upcomingMovies = await fetchUpcomingMovies();
    setData(upcomingMovies.results);
  }

  useEffect(() => {
    Home();
  }, []);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="w-[600px]">
      <div className="flex text-black bg-white p-2 rounded-md">
        <input
          type="text"
          placeholder="Search movie..."
          value={wordEntered}
          onChange={handleFilter}
          className="focus:outline-none w-full"
        />
        <div className="text-black text-2xl">
          {filteredData.length === 0 ? (
            <BiSearch />
          ) : (
            <AiOutlineClose id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="bg-white text-black rounded-md mt-2 absolute w-[600px] p-2">
          {filteredData.slice(0, 4).map((value, key) => {
            return (
              <Link
                className="hover:cursor-pointer hover:text-blue-500 transition duration-300 ease-in-out rounded-md p-1"
                href={`/movies/${value.id}`}
              >
                {/* get image, title */}
                <div className="flex gap-2 items-center">
                  <Avatar className="h-16 w-fit">
                    <AvatarImage
                      src={`https://image.tmdb.org/t/p/w500${value.poster_path}`}
                      className="object-cover"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="text-xl">{value.title}</div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
