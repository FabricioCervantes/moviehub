"use client";

import React from "react";
import HeroSection from "@components/HeroSection";
import Badge from "@components/ui/Badge";
import NowPlaying from "@components/NowPlaying";

const fetchUpcomingMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
  ).then((res) => res.json());
};

async function Home() {
  const upcomingMovies = await fetchUpcomingMovies();

  const movies = upcomingMovies.results;
  return (
    <>
      <HeroSection />
      <h1 className="text-4xl text-white px-5 mt-12 text-center md:text-left font-bold">
        Now Playing
      </h1>
      <div className="p-5 flex flex-col md:flex-row gap-10 md:gap-0 items-center justify-between"></div>
      <NowPlaying movies={movies} />
    </>
  );
}

export default Home;
