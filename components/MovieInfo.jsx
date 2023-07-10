"use client";
import { useSearchParams } from "next/navigation";
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
    router.push(`/person/?id=${actor}`);
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

const MovieInfo = () => {
  const searchParams = useSearchParams();
  const mediaId = searchParams.get("id");

  const [media, setMedia] = useState([]); // [1
  const [credits, setCredits] = useState([]); // [1
  const [images, setImages] = useState([]); // [1
  const [videos, setVideos] = useState([]); // [1

  const fetchMediaInfo = () => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${mediaId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then((res) => res.json());
  };
  const fetchMediaCredits = () => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${mediaId}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&credits`
    ).then((res) => res.json());
  };

  // get media images
  const fetchMediaImages = () => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${mediaId}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then((res) => res.json());
  };

  // get media videos
  const fetchMediaVideos = () => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${mediaId}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then((res) => res.json());
  };

  useEffect(() => {
    fetchMediaInfo().then((res) => setMedia(res));
    fetchMediaCredits().then((res) => setCredits(res));
    fetchMediaImages().then((res) => setImages(res));
    fetchMediaVideos().then((res) => setVideos(res));
  }, []);

  return (
    <>
      <h1 className="text-4xl text-white">THIS IS A TEST</h1>
    </>
  );
};

export default MovieInfo;
