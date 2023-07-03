import React from "react";
import MovieCard from "@components/MovieCard";
import Image from "next/image";
import { AiFillPlayCircle } from "react-icons/ai";

const Home = () => {
  return (
    <>
      <div>
        <div class="relative">
          <Image
            src="/assets/test1.jpg"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "800px",
              objectFit: "cover",
              opacity: "0.25",
            }} // optional
            alt="main image"
          ></Image>
          <div className="absolute top-1/2 left-1/4 md:-translate-x-80 -translate-y-1/2">
            <h1 className="text-white text-5xl main-color">MovieHub</h1>
            <p className="text-4xl text-white max-w-md mt-10">
              Track Your <span className="main-color"> Favorite</span> Movies &
              TV Shows
            </p>
            <a
              href="#_"
              className="px-5 py-2.5 relative rounded group font-medium text-white mt-10 inline-block"
            >
              <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-l from-rose-700 to-pink-600"></span>
              <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 filter group-active:opacity-0 rounded opacity-50 bg-gradient-to-l from-rose-700 to-pink-600"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl filter group-active:opacity-0 group-hover:blur-sm bg-gradient-to-l from-rose-700 to-pink-600"></span>
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-l from-rose-700 to-pink-600"></span>
              <span className="relative flex items-center gap-2">
                <AiFillPlayCircle></AiFillPlayCircle> Watch Now
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="text-white px-5 mt-16">
        <h1 className="text-4xl text-center md:text-left">Upcoming Movies</h1>
      </div>
      <div className="p-5 flex flex-col md:flex-row gap-10 md:gap-0 items-center justify-between mt-10">
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </>
  );
};

export default Home;
