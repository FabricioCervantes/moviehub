"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AiFillLike } from "react-icons/ai";
import { useRouter } from "next/navigation";

function MovieCard({ movie, type }) {
  const router = useRouter();

  const handleOnClick = () => {
    if (type === "movie") router.push(`/movies/${movie.id}`);
    else router.push(`/tv/${movie.id}`);
  };

  return (
    <div className=" text-white rounded-md w-fit hover:cursor-pointer">
      <motion.div onClick={() => handleOnClick()} whileHover={{ scale: 1.05 }}>
        {/* check if movie.poster.path is not empty, if its empty use default image */}
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

        <div className="mt-5">
          <div className="flex items-center justify-between">
            <h1 className="text-lg truncate w-60 font-bold">{movie.title}</h1>
            {movie.release_date && <p>{movie.release_date.split("-")[0]}</p>}
          </div>
          <div className="flex mt-5 justify-between">
            <p>4k</p>
            <div className="flex justify-between gap-5">
              <p>{movie.runtime}</p>
              <p className="flex gap-2 items-center">
                <AiFillLike />
                {movie.vote_average}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default MovieCard;
