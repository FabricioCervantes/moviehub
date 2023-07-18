import React from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
  BsFillStarFill,
} from "react-icons/bs";
import Image from "next/image";
import Carousel from "@components/Carousel";

const SeasonView = ({ season }) => {
  return (
    <>
      <div className="flex justify-center">
        <div className="text-white max-w-5xl w-full">
          <div className="mt-10 flex p-2 md:p-0 flex-col md:flex-row gap-10">
            <Image
              src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
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
                {season.name}
              </h1>
              <div className="flex gap-5">
                {/* Get release date but only the year */}
                <p>{season.air_date && season.air_date.slice(0, 4)}</p>
                <p>{season.runtime} min</p>
                <p className="flex items-center gap-2">
                  <BsFillStarFill className="text-yellow-500" />
                  {Math.round(season.vote_average * 10) / 10} / 10
                </p>
              </div>
              <p className="text-justify mt-5">{season.overview}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-white text-4xl font-bold text-center">Cast</h1>
        {season.cast && <Carousel data={season.cast} type="actors" />}
      </div>
      <h1 className="text-white text-4xl font-bold text-center">Episodes</h1>
      <div className="flex justify-center">
        <div className="grid md:grid-cols-2 gap-5 p-2 max-w-5xl w-full">
          {season.episodes &&
            season.episodes.map((episode) => {
              return (
                <div
                  key={episode.id}
                  className="flex flex-col gap-5 mt-5 text-white"
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                      width: "auto",
                      height: "200px",
                      objectFit: "cover",
                    }} // optional
                    alt="movie poster"
                    className="rounded-m"
                  ></Image>
                  <div className="flex flex-col p-2 gap-2">
                    <h1 className="text-4xl text-center md:text-start font-bold">
                      {episode.name}
                    </h1>
                    <div className="flex gap-5">
                      {/* Get release date but only the year */}
                      <p>{episode.air_date}</p>
                      <p>{episode.runtime} min</p>
                      <p className="flex items-center gap-2">
                        <BsFillStarFill className="text-yellow-500" />
                        {Math.round(episode.vote_average * 10) / 10} / 10
                      </p>
                    </div>
                    <p className="text-justify mt-5">{episode.overview}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SeasonView;
