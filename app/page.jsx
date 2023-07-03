import React from "react";
import MovieCard from "@components/MovieCard";
import HeroSection from "@components/HeroSection";
import Badge from "@components/ui/Badge";

const Home = () => {
  return (
    <>
      <HeroSection />
      <div className="text-white px-5 mt-16 flex items-center justify-between">
        <h1 className="text-4xl text-center md:text-left">Upcoming Movies</h1>
        <Badge />
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
