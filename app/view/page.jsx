"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const View = () => {
  const searchParams = useSearchParams();
  const mediaId = searchParams.get("id");

  const [media, setMedia] = useState([]); // [1
  const [credits, setCredits] = useState([]); // [1

  const fetchMediaInfo = () => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${mediaId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&credits`
    ).then((res) => res.json());
  };
  const fetchMediaCredits = () => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${mediaId}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&credits`
    ).then((res) => res.json());
  };
  useEffect(() => {
    fetchMediaInfo().then((res) => setMedia(res));
    fetchMediaCredits().then((res) => setCredits(res));
  }, []);

  console.log(media.original_title);
  return (
    <div className="flex justify-center">
      <div className="text-white max-w-5xl w-full">
        <div className="mt-10 flex gap-10">
          <Image
            src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "400px",
              height: "600px",
              objectFit: "cover",
            }} // optional
            alt="movie poster"
            className="rounded-md"
          ></Image>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold">{media.title}</h1>
            <div className="flex gap-5">
              <p>{media.release_date}</p>
              <p>{media.runtime} min</p>
            </div>
            <p className="text-lg">{media.tagline}</p>
            <p className="text-justify mt-5">{media.overview}</p>
            <p>Director</p>
            <div className="flex gap-5">
              {credits.crew &&
                credits.crew.map((crew) => {
                  if (crew.job === "Director") {
                    return <p className="font-bold">{crew.name}</p>;
                  }
                })}
            </div>
            <p>Cast</p>
            <div className="flex gap-5">
              {credits.cast &&
                credits.cast.slice(0, 5).map((cast) => {
                  return (
                    <div className="flex flex-col items-center">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }} // optional
                        alt="movie poster"
                        className="rounded-md"
                      ></Image>
                      <p className="font-bold">{cast.name}</p>
                      <p>{cast.character}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
