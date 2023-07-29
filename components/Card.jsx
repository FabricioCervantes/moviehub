"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AiFillLike } from "react-icons/ai";
import { useRouter } from "next/navigation";
import ListsButton from "./ListsButton";
import { useSession } from "next-auth/react";
import Link from "next/link";

function MovieCard({ movie, type }) {
  const router = useRouter();
  const { data: session } = useSession();

  console.log(movie);

  return (
    <div className=" text-white rounded-md w-fit ">
      <Link href={type === "movie" ? `/movies/${movie.id}` : `/tv/${movie.id}`}>
        <motion.div
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
      </Link>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <h1 className="text-lg truncate w-48 font-bold text-left">
            {movie.title || movie.name}
          </h1>
          {movie.release_date && <p>{movie.release_date.split("-")[0]}</p>}
          {movie.first_air_date && <p>{movie.first_air_date.split("-")[0]}</p>}
        </div>
        <div className="flex mt-2 justify-between">
          {session && <ListsButton media={movie} type={type} />}
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
