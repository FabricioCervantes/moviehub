"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AiFillLike, AiOutlineHistory } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { MdOutlineAdd } from "react-icons/md";
import { GiPopcorn } from "react-icons/gi";
import { useSession } from "next-auth/react";

function MovieCard({ movie, type }) {
  const router = useRouter();
  const { data: session } = useSession();

  const handleAddclick = async () => {
    try {
      const response = await fetch("/api/lists/watchlist/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          mediaId: movie.id,
          mediaType: type,
        }),
      });

      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavoriteclick = async () => {
    try {
      const response = await fetch("/api/lists/favorites/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          mediaId: movie.id,
          mediaType: type,
        }),
      });

      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleHistoryclick = async () => {
    try {
      const myDate = getCurrentDate();
      const response = await fetch("/api/lists/history/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          mediaId: movie.id,
          timeWatched: myDate,
          mediaType: type,
        }),
      });

      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get current date with format YYYY-MM-DD HH:MM:SS
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() is zero-based
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };

  const handleOnClick = () => {
    if (type === "movie") router.push(`/movies/${movie.id}`);
    else router.push(`/tv/${movie.id}`);
  };

  return (
    <div className=" text-white rounded-md w-fit ">
      <motion.div
        onClick={() => handleOnClick()}
        whileHover={{ scale: 1.05 }}
        className="hover:cursor-pointer"
      >
        <Image
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : "/assets/not_found.jpg"
          }
          width={300}
          height={300}
          sizes="100vw"
          alt="movie poster"
          className="rounded-md"
        />
      </motion.div>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <h1 className="text-lg truncate w-48 font-bold text-left">
            {movie.title || movie.name}
          </h1>
          {movie.release_date && <p>{movie.release_date.split("-")[0]}</p>}
          {movie.first_air_date && <p>{movie.first_air_date.split("-")[0]}</p>}
        </div>
        <div className="flex mt-2 justify-between">
          <div className="flex gap-2 items-center">
            <MdOutlineAdd
              className="text-4xl hover:cursor-pointer"
              onClick={() => handleAddclick()}
            />
            <GiPopcorn
              className="text-4xl hover:cursor-pointer"
              onClick={() => handleFavoriteclick()}
            />
            <AiOutlineHistory
              className="text-4xl hover:cursor-pointer"
              onClick={() => handleHistoryclick()}
            />
          </div>
          <div className="flex justify-between gap-5">
            {/* <p>{movie.runtime}</p> */}
            <p className="flex gap-2 items-center">
              <AiFillLike />
              {movie.vote_average}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
