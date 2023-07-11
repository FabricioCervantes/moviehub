"use client";
import Image from "next/image";

import React, { useEffect, useState, useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useEmblaCarousel from "embla-carousel-react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
  BsFillStarFill,
} from "react-icons/bs";
import { useRouter } from "next/navigation";

const EmblaCarousel = ({ actors }) => {
  const router = useRouter();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: "auto",
  });

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
    <div className="w-full">
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {actors.map((actor) => (
              <div
                className="embla__slide"
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
      </div>
      <div className="hidden md:flex justify-between p-2">
        <button
          className="absolute top-[770px] embla_right text-white text-4xl"
          onClick={scrollNext}
        >
          <BsFillArrowRightCircleFill />
        </button>
        <button
          className=" text-white absolute top-[770px] text-4xl"
          onClick={scrollPrev}
        >
          <BsFillArrowLeftCircleFill />
        </button>
      </div>
    </div>
  );
};

const View = ({ params }) => {
  const mediaId = params?.id;

  const [media, setMedia] = useState([]); // [1
  const [credits, setCredits] = useState([]); // [1
  const [images, setImages] = useState([]); // [1
  const [videos, setVideos] = useState([]); // [1

  const getMovieDetails = async () => {
    const res = await fetch(`/api/view/${mediaId}/`);
    const data = await res.json();
    setMedia(data);
    setCredits(data.credits);
    setImages(data.images);
    setVideos(data.videos);
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <div className="text-white max-w-5xl w-full">
          <div className="mt-10 flex p-2 md:p-0 flex-col md:flex-row gap-10">
            <Image
              src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
              width={0}
              height={0}
              sizes="100vw"
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
                {media.title}
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
                {credits.crew &&
                  credits.crew.map((crew) => {
                    if (crew.job === "Director") {
                      return (
                        <p key={crew.id} className="font-bold">
                          {crew.name}
                        </p>
                      );
                    }
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
      {/* <p className="text-4xl text-white px-5">Cast</p> */}
      <div className="flex justify-between p-5 mt-10 text-white">
        {credits.cast && credits.cast.length > 0 && (
          <EmblaCarousel actors={credits.cast} />
        )}
      </div>
      {/* Get images of movie */}
      <div className="p-5 flex justify-center">
        <div className="text-white w-full">
          <div className="mt-10 flex gap-10">
            <h1 className="text-4xl font-bold">Images</h1>
          </div>
          <div className="grid md:grid-cols-4 gap-5 mt-5">
            {images.backdrops &&
              images.backdrops.slice(0, 10).map((image) => {
                return (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    key={image.file_path}
                    style={{
                      width: "300px",
                      height: "150px",
                      objectFit: "cover",
                    }} // optional
                    alt="movie poster"
                    className="rounded-md"
                  ></Image>
                );
              })}
          </div>
        </div>
      </div>
      {/* get videos using video variables */}
      <div className="text-white p-5 w-full">
        <h1 className="text-4xl font-bold">Videos</h1>
        <div className="mt-10 flex gap-10 justify-center">
          <div className="grid md:grid-cols-4 gap-5 mt-5">
            {videos.results &&
              videos.results.slice(0, 5).map((video) => {
                return (
                  <iframe
                    key={video.id}
                    width="350"
                    height="200"
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
