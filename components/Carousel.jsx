"use client";

import { useEffect, useState, useCallback } from "react";

import useEmblaCarousel from "embla-carousel-react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import MovieCard from "@components/Card";

const Carousel = ({ movies }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: "auto" });
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="embla text-white relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container auto-cols-[100%] md:auto-cols-[25%]">
          {movies.map((index) => (
            <div className="embla__slide" key={index.id}>
              <MovieCard movie={index} type="movie" />
            </div>
          ))}
        </div>
      </div>
      <div className="hidden md:flex text-4xl absolute inset-y-2/4 w-full justify-between">
        <div className="flex">
          <button
            className="transform -translate-y-1/2  -translate-x-3/4"
            onClick={scrollPrev}
          >
            <BsFillArrowLeftCircleFill />
          </button>
        </div>
        <div className="flex">
          <button
            className="transform -translate-y-1/2 -translate-x-3/4"
            onClick={scrollNext}
          >
            <BsFillArrowRightCircleFill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
