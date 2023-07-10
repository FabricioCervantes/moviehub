"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";

const PersonProfile = () => {
  const searchParams = useSearchParams();
  const mediaId = searchParams.get("id");

  //get actor info
  const [person, setPerson] = useState([]);
  const [personImages, setPersonImages] = useState([]);
  const [personMovies, setPersonMovies] = useState([]);

  const fetchPerson = () => {
    return fetch(
      `https://api.themoviedb.org/3/person/${mediaId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then((res) => res.json());
  };

  const fetchPersonImages = () => {
    return fetch(
      `https://api.themoviedb.org/3/person/${mediaId}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then((res) => res.json());
  };

  const fetchPersonMovies = () => {
    return fetch(
      `https://api.themoviedb.org/3/person/${mediaId}/movie_credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then((res) => res.json());
  };

  useEffect(() => {
    fetchPerson().then((res) => setPerson(res));
    fetchPersonImages().then((res) => setPersonImages(res));
    fetchPersonMovies().then((res) => setPersonMovies(res));
  }, []);

  console.log(person);

  return (
    <>
      <div className="flex justify-center">
        <div className="text-white max-w-5xl w-full">
          <div className="flex flex-col md:flex-row p-3 md:p-0 gap-10">
            <div className="min-w-fit flex flex-col items-center">
              <Image
                src={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "auto",
                  height: "500px",
                  objectFit: "cover",
                }} // optional
                alt={person.name}
                className="rounded-lg"
              />
              <div className="flex flex-col gap-1 mt-5">
                <h1 className="text-4xl md:hidden font-bold text-center mb-10">
                  {person.name}
                </h1>
                <p className="font-bold text-2xl">Personal Info</p>
                <p className="text-md">
                  <span className="font-bold">Born: </span>
                  {person.birthday}
                </p>
                <p className="text-md w-80">
                  <span className="font-bold">Place of Birth: </span>
                  {person.place_of_birth}
                </p>
                <div className="text-md">
                  <span className="font-bold">Gender: </span>
                  {person.gender === 1 ? <p>Female</p> : <p>Male</p>}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              {/* get person name and biography */}
              <h1 className="text-4xl hidden md:block font-bold text-center md:text-left">
                {person.name}
              </h1>
              <p className="text-bold text-2xl">Biography</p>
              <p className="text-sm text-justify whitespace-pre-line ">
                {person.biography}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* get person images */}
      <div className="flex flex-col md:flex-row gap-10 mt-5 p-5">
        <div className="w-full flex flex-col gap-5">
          <h1 className="text-4xl font-bold text-center text-white md:text-left">
            Images
          </h1>
          <div className="grid md:grid-cols-4 justify-center gap-5">
            {personImages.profiles?.slice(0, 5).map((image) => (
              <Image
                src={`https://image.tmdb.org/t/p/original/${image.file_path}`}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "auto",
                  height: "500px",
                  objectFit: "cover",
                }} // optional
                alt={person.name}
                className="rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
      {/* get person movies */}
      <div className="flex flex-col md:flex-row gap-10 p-5">
        <div className="w-full flex flex-col gap-5">
          <h1 className="text-4xl font-bold text-center text-white md:text-left">
            Movies
          </h1>
          <div className="grid md:grid-cols-4 justify-center gap-5">
            {personMovies.cast
              ?.sort((a, b) => b.popularity - a.popularity)
              .slice(0, 10)
              .map((movie) => (
                <div>
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                      width: "300px",
                      height: "350px",
                      objectFit: "cover",
                    }} // optional
                    alt={person.name}
                    className="rounded-lg"
                  />
                  <div className="flex flex-col gap-1 mt-3">
                    <p className="text-white font-bold text-center">
                      {movie.title}
                    </p>
                    <p className="text-white text-center">{movie.character}</p>
                    <p className="text-white text-center">
                      {movie.release_date?.slice(0, 4)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonProfile;
