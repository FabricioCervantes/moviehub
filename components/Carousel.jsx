"use client";

import { useEffect, useState, useCallback } from "react";

import useEmblaCarousel from "embla-carousel-react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import MovieCard from "@components/Card";
import Image from "next/image";

const Carousel = ({ data, type }) => {
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
          {type === "movie_poster" &&
            data.map((index) => (
              <div className="embla__slide" key={index.id}>
                <MovieCard movie={index} type="movie" />
              </div>
            ))}
          {type === "person_images" &&
            data.map((index) => (
              <Image
                src={`https://image.tmdb.org/t/p/original/${index.file_path}`}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "auto",
                  height: "450px",
                  objectFit: "cover",
                }} // optional
                alt="person image"
                className="rounded-lg"
              />
            ))}
          {type === "media_images" &&
            data.map((index) => (
              <Image
                src={`https://image.tmdb.org/t/p/w500${index.file_path}`}
                width={0}
                height={0}
                sizes="100vw"
                key={index.file_path}
                style={{
                  width: "300px",
                  height: "150px",
                  objectFit: "cover",
                }} // optional
                alt="movie poster"
                className="rounded-md"
              ></Image>
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
