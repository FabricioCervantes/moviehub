"use client";

import React, { useCallback } from "react";
import MovieCard from "@components/MovieCard";
import HeroSection from "@components/HeroSection";
import Badge from "@components/ui/Badge";
import useEmblaCarousel from "embla-carousel-react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

const fetchUpcomingMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
  ).then((res) => res.json());
};

const EmblaCarousel = ({ movies }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide flex justify-center items-center gap-5">
            {movies.slice(0, 4).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="embla__slide flex justify-center items-center gap-5">
            {movies.slice(4, 8).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="embla__slide flex justify-center items-center gap-5">
            {movies.slice(8, 12).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between p-5 ">
        <button
          className="embla__button text-white text-4xl "
          onClick={scrollPrev}
        >
          <BsFillArrowLeftCircleFill />
        </button>
        <button
          className="embla__button embla_right text-white text-4xl"
          onClick={scrollNext}
        >
          <BsFillArrowRightCircleFill />
        </button>
      </div>
    </div>
  );
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
      <EmblaCarousel movies={movies} />
    </>
  );
}

export default Home;
