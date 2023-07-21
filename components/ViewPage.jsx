"use client";

import React, { useEffect, useState, useCallback } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useEmblaCarousel from "embla-carousel-react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
  BsFillStarFill,
} from "react-icons/bs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Carousel from "@components/Carousel";

const EmblaCarousel = ({ actors }) => {
  const router = useRouter();

  const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: "auto" });
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleActor = (actor) => {
    router.push(`/person/${actor}`);
  };

  return (
    <div className="embla text-white relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container auto-cols-[100%] md:auto-cols-[20%]">
          {actors.map((actor) => (
            <div
              className="embla__slide hover:cursor-pointer"
              key={actor.id}
              onClick={() => handleActor(actor.id)}
            >
              <div className="flex flex-col items-center">
                <Avatar className="h-32 w-32">
                  <AvatarImage
                    className="object-cover"
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-center">{actor.name}</p>
                  <p className="w-40 text-center">{actor.character}</p>
                </div>
              </div>
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

const ViewPage = ({ media }) => {
  const router = useRouter();

  const handleSeasonClick = (season) => {
    router.push(`/tv/${media.id}/season/${season}`);
  };

  console.log(media);
  const bgPhoto = `https://image.tmdb.org/t/p/original${media.backdrop_path}`;

  return (
    <div
      className="bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center bg-fixed bg_page"
      style={{ "--image-url": `url(${bgPhoto})` }}
    >
      <div className={`flex justify-center pb-5`}>
        <div className="text-white max-w-5xl w-full">
          <div className="mt-10 flex p-2 md:p-0 flex-col md:flex-row gap-10">
            <Image
              src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
              width={0}
              height={0}
              sizes="100vw"
              layout="responsive"
              style={{
                width: "auto",
                height: "500px",
                objectFit: "cover",
              }} // optional
              alt="movie poster"
              className="rounded-m"
            ></Image>
            <div className="flex flex-col p-2 gap-2">
              <h1 className="text-4xl text-center md:text-start font-bold">
                {media.title || media.name}
              </h1>
              <div className="flex gap-5">
                {/* Get release date but only the year */}
                <p>{media.release_date && media.release_date.slice(0, 4)}</p>
                <p>{media.runtime} min</p>
                <p className="flex items-center gap-2">
                  <BsFillStarFill className="text-yellow-500" />
                  {Math.round(media.vote_average * 10) / 10} / 10
                </p>
              </div>
              <p className="text-lg">{media.tagline}</p>
              <p className="text-justify mt-5">{media.overview}</p>
              <p>Director</p>
              <div className="flex gap-5">
                {media.credits &&
                  media.credits.crew
                    .filter((crew) => crew.job === "Director")
                    .map((director) => {
                      return (
                        <p key={director.id} className="text-lg">
                          {director.name}
                        </p>
                      );
                    })}
              </div>
              <div className="mt-5">
                <h1 className="mb-5 font-bold text-xl">Genres</h1>
                <div className="flex gap-5 flex-wrap justify-center md:justify-start">
                  {media.genres &&
                    media.genres.map((genre) => {
                      return (
                        <span
                          key={genre.id}
                          className="bg-gray-700 rounded-full px-3 py-1 text-lg font-semibold text-gray-300 mr-2"
                        >
                          {genre.name}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-4xl font-bold text-center text-white px-5">Cast</p>
        {media.credits && media.credits.cast.length > 0 && (
          <EmblaCarousel actors={media.credits.cast} />
        )}
      </div>
      <div className="p-5">
        {media.seasons && (
          <>
            <h1 className="text-4xl font-bold text-center text-white px-5">
              Seasons
            </h1>
            <Carousel
              data={media.seasons}
              type="tv_seasons"
              handleSeasonClick={handleSeasonClick}
            />
          </>
        )}
      </div>
      {/* Get images of movie */}
      <h1 className="text-4xl font-bold text-center text-white">Images</h1>
      <div className="px-5 flex justify-center">
        <div className="text-white w-full">
          <div className="flex gap-10"></div>
          <div className="">
            {media.images && (
              <Carousel data={media.images.backdrops} type="media_images" />
            )}
          </div>
        </div>
      </div>
      {/* get videos using video variables */}
      <h1 className="text-4xl font-bold text-center text-white">Videos</h1>
      <div className="px-5 flex justify-center">
        <div className="text-white w-full">
          <div className="flex gap-10"></div>
          {/* <div className="">
            {media.videos && (
              <Carousel data={media.videos.results} type="media_videos" />
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
