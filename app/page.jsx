import React from "react";
import MovieCard from "@components/MovieCard";

const Home = () => {
  return (
    <div className="p-5 flex justify-between mt-20">
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
    </div>
  );
};

export default Home;
