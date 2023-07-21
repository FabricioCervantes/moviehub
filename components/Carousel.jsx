"use client";

import { useEffect, useState, useCallback } from "react";

import useEmblaCarousel from "embla-carousel-react";
import { BsFillStarFill } from "react-icons/bs";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import MovieCard from "@components/Card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Carousel = ({ data, type, handleSeasonClick }) => {
  const router = useRouter();

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
              <div className="embla__slide p-1" key={index.id}>
                <MovieCard movie={index} type="movie" />
              </div>
            ))}
          {type === "actors" &&
            data.map((index) => (
              <div
                className="embla__slide hover:cursor-pointer"
                key={index.id}
                // onClick={() => handleActor(index.id)}
              >
                <div className="flex flex-col items-center">
                  <Avatar className="h-32 w-32">
                    <AvatarImage
                      className="object-cover"
                      src={`https://image.tmdb.org/t/p/w500${index.profile_path}`}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-center">{index.name}</p>
                    <p className="w-40 text-center">{index.character}</p>
                  </div>
                </div>
              </div>
            ))}
          {type === "person_images" &&
            data.map((index) => (
              <>
                <Dialog>
                  <DialogTrigger className="ml-9">
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
                  </DialogTrigger>
                  <DialogContent className="p-0">
                    <DialogHeader className="p-0">
                      <DialogDescription>
                        <Image
                          src={`https://image.tmdb.org/t/p/original/${index.file_path}`}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{
                            width: "550px",
                            // height: "700px",
                            objectFit: "cover",
                          }} // optional
                          alt="person image"
                          className="rounded-lg"
                        />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </>
            ))}
          {type === "media_images" &&
            data.map((index) => (
              <Dialog>
                <DialogTrigger className="ml-9">
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
                </DialogTrigger>
                <DialogContent className="p-0 max-w-6xl">
                  <DialogHeader className="p-0">
                    <DialogDescription>
                      <Image
                        src={`https://image.tmdb.org/t/p/original/${index.file_path}`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        key={index.file_path}
                        style={{
                          width: "1200px",
                          objectFit: "cover",
                        }} // optional
                        alt="movie poster"
                        className="rounded-md"
                      />
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            ))}
          {type === "media_videos" &&
            data.map((index) => (
              <></>
              // <iframe
              //   key={index.id}
              //   width="350"
              //   height="200"
              //   src={`https://www.youtube.com/embed/${index.key}`}
              //   title="YouTube video player"
              //   frameBorder="0"
              //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              // ></iframe>
            ))}
          {type === "tv_seasons" &&
            data.map((index) => (
              <div
                className=" text-white flex flex-col items-center hover:cursor-pointer"
                onClick={() => handleSeasonClick(index.season_number)}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${index.poster_path}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: "auto",
                    height: "400px",
                    objectFit: "cover",
                  }} // optional
                  alt="movie poster"
                  className="rounded-md"
                ></Image>
                <div className="flex flex-col items-center p-2 gap-2">
                  <h1 className="text-2xl text-center md:text-start font-bold">
                    {index.name}
                  </h1>
                  <div className="flex gap-5">
                    <p>{index.air_date.slice(0, 4)}</p>
                    <p>{index.episode_count} episodes</p>
                    <p className="flex items-center gap-2">
                      <BsFillStarFill className="text-yellow-500" />
                      {Math.round(index.vote_average * 10) / 10} / 10
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* check if data length is above 4 */}
      {data.length > 4 && (
        <div className="hidden md:flex text-4xl absolute inset-y-2/4 w-full justify-between">
          <div className="flex">
            <button
              className="transform -translate-y-1/2  -translate-x-5"
              onClick={scrollPrev}
            >
              <BiSolidLeftArrow />
            </button>
          </div>
          <div className="flex">
            <button
              className="transform -translate-y-1/2 -translate-x-5"
              onClick={scrollNext}
            >
              <BiSolidRightArrow />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
