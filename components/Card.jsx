"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AiFillLike } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { MdOutlineAdd } from "react-icons/md";
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
          <h1 className="text-lg truncate w-48 font-bold">{movie.title}</h1>
          {movie.release_date && <p>{movie.release_date.split("-")[0]}</p>}
        </div>
        <div className="flex mt-5 justify-between">
          <MdOutlineAdd
            className="text-4xl hover:cursor-pointer"
            onClick={() => handleAddclick()}
          />
          <div className="flex justify-between gap-5">
            <p>{movie.runtime}</p>
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
