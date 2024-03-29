"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import MovieCard from "@components/Card";
import Carousel from "@components/Carousel";

const EmblaCarousel = ({ movies }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: "auto" });
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container gap-16">
          {movies.map((movie) => (
            <div key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
      <div className="hidden md:flex justify-between p-5 ">
        <button
          className="embla__button embla_left text-white text-4xl "
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

const NowPlaying = ({ movies }) => {
  return (
    <div className="p-5">
      <Carousel data={movies} type="movie_poster" />
    </div>
  );
};

export default NowPlaying;
