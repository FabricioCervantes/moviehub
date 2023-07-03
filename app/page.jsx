import React from "react";
import MovieCard from "@components/MovieCard";
import Image from "next/image";
import { AiFillPlayCircle } from "react-icons/ai";
import MainBtn from "@components/ui/MainBtn";
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
            <h1 className="text-white text-5xl font-extrabold main-color">
              MovieHub
            </h1>
            <p className="text-4xl text-white max-w-md mt-10">
              Track Your <span className="main-color"> Favorite</span> Movies &
              TV Shows
            </p>
            <div className="mt-10">
              <MainBtn icon={<AiFillPlayCircle />} text="Watch Now" url="/" />
            </div>
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
