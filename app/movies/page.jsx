"use client";
import DisplayMedia from "@components/DisplayMedia";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(28);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("popularity.desc");

  const { data: session } = useSession();

  const pag = Array.from(Array(5).keys()).map((i) => i + 1);

  const fetchGenre = () => {
    return fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=a97a0e69992c3fbbfda4f5387a476249`
    ).then((res) => res.json());
  };

  const fetchUpcomingMovies = () => {
    return fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${page}&with_genres=${selectedGenre}&sort_by=${sort}`
    ).then((res) => res.json());
  };

  const fetchMovies = async () => {
    const test = await fetchGenre();
    const upcomingMovies = await fetchUpcomingMovies();

    if (session) {
      const historyItems = await getHistoryItems();
      const favoritesItems = await getFavoritesItems();
      const watchlistItems = await getWatchlistItems();

      upcomingMovies.results.map((item) => {
        favoritesItems.map((favorite) => {
          if (item.id == favorite.mediaId) {
            item.favorite = true;
          }
        });
        historyItems.map((history) => {
          if (item.id == history.mediaId) {
            item.history = true;
          }
        });
        watchlistItems.map((watchlist) => {
          if (item.id == watchlist.mediaId) {
            item.watchlist = true;
          }
        });
      });
    } else {
      console.log("Not session");
    }

    setMovies(upcomingMovies.results);
    setGenre(test.genres);
  };

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

  const getWatchlistItems = () => {
    return fetch(`/api/lists/watchlist/${session?.user.id}`).then((res) =>
      res.json()
    );
  };

  const getHistoryItems = () => {
    return fetch(`/api/lists/history/${session?.user.id}`).then((res) =>
      res.json()
    );
  };

  const getFavoritesItems = () => {
    return fetch(`/api/lists/favorites/${session?.user.id}`).then((res) =>
      res.json()
    );
  };

  useEffect(() => {
    fetchMovies();
  }, [sort, page, selectedGenre]);

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
      <DisplayMedia media={movies} type="movie" />
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

export default Movies;
