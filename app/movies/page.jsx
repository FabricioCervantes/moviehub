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
  const [loading, setLoading] = useState(true); // Agrega este estado para controlar la carga

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

  const validateMediaItems = (mediaItems) => {
    return mediaItems.reduce((acc, item) => {
      acc[item.mediaId] = item;
      return acc;
    }, {});
  };

  const fetchMovies = async () => {
    setLoading(true); // Mostrar el mensaje de espera
    const test = await fetchGenre();
    const upcomingMovies = await fetchUpcomingMovies();

    if (session) {
      const historyItems = await getHistoryItems();
      const favoritesItems = await getFavoritesItems();
      const watchlistItems = await getWatchlistItems();

      const favoritesMap = validateMediaItems(favoritesItems);
      const historyMap = validateMediaItems(historyItems);
      const watchlistMap = validateMediaItems(watchlistItems);

      const updatedMovies = upcomingMovies.results.map((item) => {
        if (favoritesMap[item.id]) {
          item.favorite = true;
        }

        if (historyMap[item.id]) {
          item.history = true;
        }

        if (watchlistMap[item.id]) {
          item.watchlist = true;
        }

        return item;
      });
      setMovies(updatedMovies);
      setGenre(test.genres);
    } else {
      console.log("Not session");
      setMovies(upcomingMovies.results);
      setGenre(test.genres);
    }
    setLoading(false); // Ocultar el mensaje de espera
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
      {loading ? (
        <div class="w-full h-screen bg text-white grid grid-cols-1 grid-rows-1 place-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="currentColor"
            class="bi bi-arrow-repeat animate-spin"
            viewBox="0 0 16 16"
          >
            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
            <path
              fill-rule="evenodd"
              d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
            />
          </svg>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default Movies;
