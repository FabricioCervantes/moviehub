import React from "react";
import { useState, useEffect, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SearchBar = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [data, setData] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const router = useRouter();
  const searchContainerRef = useRef(null);

  const searchMovie = () => {
    return fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=${wordEntered}`
    ).then((res) => res.json());
  };

  async function Home() {
    const searchedMovies = await searchMovie();
    setData(searchedMovies.results);
  }

  useEffect(() => {
    Home();
  }, [data]);

  const handleClick = (value) => {
    if (value.title) {
      setShowResults(false);
      router.push(`/movies/${value.id}`);
    }
    if (value.name) {
      setShowResults(false);
      router.push(`/tv/${value.id}`);
    }
    if (value.known_for_department) {
      setShowResults(false);
      router.push(`/person/${value.id}`);
    }
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    Home();
    const newFilter = data.filter((value) => {
      if (value.title)
        return value.title.toLowerCase().includes(searchWord.toLowerCase());
      if (value.name)
        return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    setShowResults(newFilter.length > 0);

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
    setShowResults(false);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
    ) {
      setShowResults(false);
    }
  };

  return (
    <div className="w-[300px] md:w-[600px]" ref={searchContainerRef}>
      <div className="flex text-white nav-bg p-2 rounded-md">
        <input
          type="text"
          placeholder="Search movie..."
          value={wordEntered}
          onChange={handleFilter}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClick(filteredData[0]);
            }
            if (e.key === "Escape") {
              clearInput();
            }
          }}
          className="focus:outline-none w-full bg-transparent text-sm md:text-xl"
        />
        <div className="text-white text-2xl hidden md:block">
          {filteredData.length === 0 ? (
            <BiSearch />
          ) : (
            <AiOutlineClose id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {showResults && filteredData.length !== 0 && (
        <div className="text-white rounded-md mt-2 nav-bg absolute w-[300px] md:w-[600px] p-2">
          {filteredData.slice(0, 4).map((value, key) => {
            return (
              <div
                className="hover:cursor-pointer hover:text-blue-500 transition duration-300 ease-in-out rounded-md p-1"
                onClick={() => {
                  handleClick(value);
                }}
              >
                {/* get image, title */}
                <div className="flex gap-2 items-center">
                  <Avatar className="h-16 w-fit">
                    {value.poster_path && (
                      <AvatarImage
                        src={`https://image.tmdb.org/t/p/w500${value.poster_path} `}
                        className="object-cover"
                      />
                    )}
                    {value.profile_path && (
                      <AvatarImage
                        src={`https://image.tmdb.org/t/p/w500${value.profile_path} `}
                        className="object-cover"
                      />
                    )}

                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="text-xl">{value.title || value.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
