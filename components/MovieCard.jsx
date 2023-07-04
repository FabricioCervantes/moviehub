"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AiFillLike } from "react-icons/ai";

function MovieCard({ movie }) {
  return (
    <div className=" text-white rounded-md w-fit">
      <motion.div whileHover={{ scale: 1.05 }}>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          width={300}
          height={300}
          alt="movie poster"
          className="rounded-md"
        ></Image>

        <div className="mt-5">
          <div className="flex items-center justify-between">
            <h1 className="text-lg truncate w-60 font-bold">{movie.title}</h1>
            <p>{movie.release_date.split("-")[0]}</p>
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
